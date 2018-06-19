var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
var http = require('http');

app.post('/', function (req, res) {
    console.log("/", "post", req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.put('/', function (req, res) {
    console.log("/", "put", req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.delete('/', function (req, res) {
    console.log("/", "delete");
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.get('/', function (req, res) {
    console.log("/", "get");
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

var port = process.env.PORT || 3000;

app.set('port', port);
var server = http.createServer(app);
server.listen(port, '0.0.0.0', function () {
        console.log('server running... on port' + port);
});
