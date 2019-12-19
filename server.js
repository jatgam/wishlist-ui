var express  = require('express');
var proxy = require('http-proxy-middleware');
var app      = express();
const fs = require('fs');
const path = require('path');

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'localhost';
const API_SERVER_PORT = process.env.API_SERVER_PORT || 4000;
 
var apiProxyOptions = {
    target: `http://${API_SERVER_HOST}:${API_SERVER_PORT}`,
    pathRewrite: { '^/api': '' }
};
var apiProxy = proxy(apiProxyOptions);

app.use('/api', apiProxy);

app.get(/^(?!\/(build|static|styles|fonts|manifest.json|favicon.ico|.+js)).+/, (_req, res) => {
    const html = fs.readFileSync(path.join(__dirname, 'build', 'index.html'), 'utf-8');
    res.send(html);
});

app.use(express.static('build'));
app.disable("x-powered-by")
var server = require('http').createServer(app);

server.listen(3000);
