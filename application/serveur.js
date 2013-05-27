var http = require('http');
var url = require('url');

function start(route, handle) {
  
  function surRequete (requete, reponse) {
    var pathname = url.parse(requete.url).pathname;
    console.log("Requete recue : " + pathname);
    
    route(handle, pathname, reponse);
    
  }
  
  http.createServer(surRequete).listen(8888);
  console.log("Server started");
}

exports.start = start;
