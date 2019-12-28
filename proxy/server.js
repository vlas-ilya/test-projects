const proxy = require('express-http-proxy');
const app = require('express')();
const config = require('../config');

app.use('/api', proxy(`localhost:${config.backend.port}/api`, {
  proxyReqPathResolver: (req) => `/api${req.url}`
}));

app.use('/', proxy(`localhost:${config.frontend.port}/`));

app.listen(config.proxy.port);

console.log(`proxy is listening on port ${config.proxy.port}`);
