var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

var imgbase64 = "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";
var htmlImage = `<html><head><style>body { background-image:url('data:image/jpeg;base64,${imgbase64}'); background-repeat: no-repeat; background-size: 100% 100%; } html { height: 100% } </style></head><body></body></html>`;
var urlImage = `http://test-curl.herokuapp.com/img-file`
    
app.use(bodyParser.json());
var http = require('http');

app.post('/', function (req, res) {
    console.log("/", "POST", req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.post('/img', function (req, res) {
    console.log("/img", "POST", req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(`{ \"img\" : \"${imgbase64}\" }`);
});

app.post('/img-file', function (req, res) {
    console.log("/img-file", "POST", req.body);
    var img = new Buffer(imgbase64, 'base64');
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length' : img.length });
    res.end(img, 'binary');
});

app.put('/', function (req, res) {
    console.log("/", "PUT", req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.delete('/', function (req, res) {
    console.log("/", "DELETE");
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.get('/', function (req, res) {
    console.log("/", "GET");
    res.setHeader('Content-Type', 'application/json');
    res.send("{ \"msg\" : \"OK\" }");
});

app.get('/img', function (req, res) {
    console.log("/img", "GET");
    res.setHeader('Content-Type', 'application/json');
    res.send(`{ \"img\" : \"${imgbase64}\" }`);
});

app.get('/img-file', function (req, res) {
    console.log("/img-file", "GET");
    var img = new Buffer(imgbase64, 'base64');
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length' : img.length });
    res.end(img, 'binary');
});

app.get('/img-html', function (req, res) {
    console.log("/img-html", "GET");
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(htmlImage);  
    res.end();
});

app.post('/img-html', function (req, res) {
    console.log("/img-html", "POST", req.body);
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(htmlImage);  
    res.end();
});

app.get('/url', function (req, res) {
    console.log("/img-url", "GET");
    res.writeHeader(200, {"Content-Type": "text/plain"});  
    res.write(urlImage);  
    res.end();
});

app.post('/url', function (req, res) {
    console.log("/img-url", "POST", req.body);
    res.writeHeader(200, {"Content-Type": "text/plain"});  
    res.write(urlImage);  
    res.end();
});

var port = process.env.PORT || 3000;

app.set('port', port);
var server = http.createServer(app);
server.listen(port, '0.0.0.0', function () {
        console.log('server running... on port' + port);
});
