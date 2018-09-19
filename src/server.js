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
import windSchema from './data/wind/windSchema';
import windModels, { WindUser } from './data/wind/models';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import { verifyJWTToken } from './routes/verifyJWTToken';
const fs = require('fs');
import https from 'https';
const formidable = require('formidable'), http = require('http'), util = require('util');
// wind router register
import windUsers from './routes/wind/users';
import windCompanys from './routes/wind/companys';
import windDefectTypes from './routes/wind/defectTypes';
import turbineConfigs from './routes/wind/turbineConfigs';
import premiseConfigs from './routes/wind/premiseConfigs';
import windFields from './routes/wind/windFields';
import windMachine from './routes/wind/windMachine';
import windVane from './routes/wind/windVane';
import windFanPhoto from './routes/wind/windFanPhoto';
import windPhotoDefect from './routes/wind/windPhotoDefect'
import windRoutingInspects from './routes/wind/routingInspects'

import { userDes, windUserDes } from './data/dataUtils';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const verifyToken = verifyJWTToken();

const usingCluster = process.env.CLUSTER || false;
import compression from 'compression';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  // process.exit(1);
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

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req =>
      req.body.token || req.query.token || req.headers['x-access-token'],
  }).unless({ path: ['/rea/auth', '/wind/auth'] }),
);

app.use(passport.initialize());

// =======================================================================================================
//
// Register MYSQL API middleware
// -----------------------------------------------------------------------------
app.use(
  '/wind/msgraphql',
  expressGraphQL(req => ({
    schema: windSchema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register Wind API router
// -----------------------------------------------------------------------------
app.use('/wind/users', windUsers);
app.use('/wind/companies', windCompanys);
app.use('/wind/defectTypes', windDefectTypes);
app.use('/wind/turbineConfigs', turbineConfigs);
app.use('/wind/premiseConfigs', premiseConfigs);
app.use('/wind/windFields', windFields);
app.use('/wind/windMachines', windMachine);
app.use('/wind/windVanes', windVane);
app.use('/wind/windFanPhotos', windFanPhoto);
app.use('/wind/windPhotoDefect', windPhotoDefect);
app.use('/wind/routingInspects', windRoutingInspects);



// upload file
app.post(
  '/wind/upload',
  (req, res) => {
    var form = new formidable.IncomingForm(),
      files = {};
    form.uploadDir = path.resolve(__dirname, '../public/uploads');
    form.keepExtensions = true;
    try{
      form
        .on('file', function(field, file) {
          console.log(field, file.path);
          files =  file.path;
        })
        .on('end', function() {
          console.log('-> upload done');
          res.writeHead(200, {'content-type': 'text/plain'});
          let n = files.lastIndexOf('/');
          res.end(util.inspect({result:'success',FileId:files.substring(n + 1)}));
        });
      form.parse(req);
    }catch (e) {
      res.status(200).send({
        result: 'error', msg: 'upload file met error!'
      });
    }
  },
);

// Auth wind user
app.post(
  '/wind/auth',
  passport.authenticate('wind', {
    session: false,
  }),

  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 10; // 10 days
    const token = jwt.sign({ name: req.user.name }, config.auth.jwt.secret, {
      expiresIn,
    });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.status(200).send({
      token,
      user: req.user,
      status: 'ok',
      currentAuthority: windUserDes[req.user.type],
    })
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
      schema: windSchema,
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
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
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
  console.log(`Main ${process.pid} is working!`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    /* eslint-disable no-console */
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
} else {
  // Launch the server
  // -----------------------------------------------------------------------------
  // const promise = mssqlModels.sync({force:true}).catch(err => console.error(err.stack));
  const promise = windModels.sync().catch(err => console.error(err.stack));
  if (!module.hot) {
    promise.then(() => {
      if (config.port === '443') {
        const options = {
          pfx: fs.readFileSync(
            './public/retailservice.pfx',
          ),
          passphrase: 'Rs5cbs!726',
        };
        https.createServer(options, app).listen(config.port, () => {
          console.info(
            `The server is running at https://localhost:${config.port}/`,
          );
        });
      } else {
        app.listen(config.port, () => {
          console.info(
            `The server is running at http://localhost:${config.port}/`,
          );
        });
      }
    });
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
