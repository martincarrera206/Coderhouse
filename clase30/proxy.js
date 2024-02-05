const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.headers, req.body, req.params)
    return next()
})

app.use('/users', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true }));

app.listen(3000);

