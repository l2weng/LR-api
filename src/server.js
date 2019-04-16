import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import schema from './data/schema';
import LRModels from './data/models';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import https from 'https';
import log4js from 'log4js';
import users from './routes/labelreal/users';
import teams from './routes/labelreal/teams';
import projects from './routes/labelreal/projects';
import tasks from './routes/labelreal/tasks';
import photos from './routes/labelreal/photos';
import labels from './routes/labelreal/labels';
import compression from 'compression';
import UserLogin from './data/models/UserLogin'

const fs = require('fs');
// const formidable = require('formidable'),
//   http = require('http'),
//   util = require('util');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
log4js.configure('./config/log4js.json');
const log = log4js.getLogger("app");

// import { verifyJWTToken } from './routes/verifyJWTToken';
// const verifyToken = verifyJWTToken();

const usingCluster = process.env.CLUSTER || false;

try {
  fs.mkdirSync('./log');
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, p) => {
  log.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );

  // and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Register API router
// -----------------------------------------------------------------------------
app.use('/lr/users', users);
app.use('/lr/teams', teams);
app.use('/lr/projects', projects);
app.use('/lr/tasks', tasks);
app.use('/lr/photos', photos);
app.use('/lr/labels', labels);

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req =>
      req.body.token || req.query.token || req.headers['x-access-token'],
  }).unless({ path: ['/lr/auth'] }),
);

app.use(passport.initialize());

// =======================================================================================================
//
// Register MYSQL API middleware
// -----------------------------------------------------------------------------
app.use(
  '/lr/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

// Auth user
app.post(
  '/lr/auth',
  passport.authenticate('lr', {
    session: false,
  }),
  (req, res) => {
    let ip = req.body.ip
    const expiresIn = 60 * 60 * 24 * 10; // 10 days
    const token = jwt.sign({ name: req.user.user.name }, config.auth.jwt.secret, {
      expiresIn,
    });
    UserLogin.create({ip,userId:req.user.user.userId})
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.status(200).send({
      token,
      lastProject: req.user.projects[0],
      hasProject: req.user.hasProject,
      user: req.user.user,
      ip,
      status: 'ok',
    });
  },
);
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      schema,
      graphql,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: config.api.clientUrl,
    };
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log.error("Something went wrong:", err);
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[
        {
          id: 'css',
          cssText: errorPageStyle._getCss(),
        },
      ]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------

if (cluster.isMaster && usingCluster) {
  console.info(`Main ${process.pid} is working!`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    /* eslint-disable no-console */
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
} else {
  // Launch the server
  // -----------------------------------------------------------------------------
  // const promise = LRModels.sync({force:true}).catch(err => console.error(err.stack));
  // const promise = LRModels.sync().catch(err => console.error(err.stack));
  if (!module.hot) {
    // promise.then(() => {
      if (config.port === '443') {
        const options = {
          pfx: fs.readFileSync('./public/retailservice.pfx'),
          passphrase: 'Rs5cbs!726',
        };
        https.createServer(options, app).listen(config.port, () => {
          log.info(
            `The server is running at https://localhost:${config.port}/`,
          );
        });
      } else {
        app.listen(config.port, () => {
          log.info(
            `The server is running at http://localhost:${config.port}/`,
          );
        });
      }
    // })
  }
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
