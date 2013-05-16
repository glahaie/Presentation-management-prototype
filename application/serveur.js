var http = require('http');
var url = require('url');

function start(route) {
  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request received : " + pathname);
    
    route(pathname);
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }).listen(8888);
  console.log("Server started");
}

exports.start = start;
