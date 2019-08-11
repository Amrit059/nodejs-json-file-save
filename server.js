var express = require('express')
var serveStatic = require('serve-static')
var cors = require('cors')
var compression = require('compression')
const http = require('http');
const path = require('path');

var app = express()

app.use(compression({ level: 9 }));
app.use(cors());

app.use(express.static(path.join(__dirname) + '/dist/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname) + '/dist/index.html');
});

const server = http.createServer(app);

server.listen(8081, () => {
    console.log('Application is started')
})