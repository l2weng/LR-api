const loadtest = require('loadtest');

const options = {
  url: 'http://reaapi-server.chinanorth.cloudapp.chinacloudapi.cn/',
  concurrent: 5,
  method: 'get',
  body: '',
  requestsPerSecond: 5,
  maxSeconds: 30,
  indexParam: 'msgraphql',
  requestGenerator: (params, options, client, callback) => {
    const message =
      '{query: {users{userId name displayName typeDes phone email type}}}';
    options.headers['Content-Length'] = message.length;
    options.body = {
      query:
        '{\n' +
        ' users {\n' +
        '   name\n' +
        '   displayName\n' +
        '   email\n' +
        '   phone\n' +
        '   type\n' +
        '   typeDes\n' +
        ' }\n' +
        '}',
      token:
        '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7InVzZXJJZCI6ImM3N2QxYzYwLTQzNzUtMTFlOC04MjJjLThkY2E4YzNjYzFkYiIsIm5hbWUiOiJpY2VodSIsImRpc3BsYXlOYW1lIjoiaWNlIiwiZW1haWwiOiJsZXQucm9ja0BjbG9hYm90aWNzLmNvbSIsInBob25lIjoiMTg2MTg4ODE4ODgiLCJ0eXBlIjoyLCJ0eXBlRGVzIjoic3VwZXJ2aXNvciIsImFjdGl2ZSI6MCwicGFzc3dvcmRfaGFzaCI6IjI1ZDU1YWQyODNhYTQwMGFmNDY0Yzc2ZDcxM2MwN2FkIiwiY3JlYXRlZEF0IjoiMjAxOC0wNC0xOVQwMjowMjo1Ny4xOTJaIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0xOVQwMjowMjo1Ny4xOTJaIiwiUmVhVXNlclVzZXJJZCI6bnVsbH0sImlhdCI6MTUyNDEwMzM4NiwiZXhwIjoxNTI0OTY3Mzg2fQ.KZ8mDJrFddkuIFZzsQ-eUN0tT7K_fxm1h3i1Dlab-Ns',
    };
    options.path =
      'http://reaapi-server.chinanorth.cloudapp.chinacloudapi.cn/msgraphql';
    const request = client(options, callback);
    request.write(message);
    return request;
  },
};

loadtest.loadTest(options, (error, results) => {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log(results);
  console.log('Tests run successfully');
});

// loadtest -c 10 -t 20 http://reaapi-server.chinanorth.cloudapp.chinacloudapi.cn/ -R userLoadTest.js
