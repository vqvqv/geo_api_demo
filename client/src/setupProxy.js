const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/location', {
      target: 'http://127.0.0.1:3000', // API endpoint
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/user', {
      target: 'http://127.0.0.1:3000', // Login server endpoint
      changeOrigin: true
    })
  );
}