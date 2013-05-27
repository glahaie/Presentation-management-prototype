function editer(reponse) {
  console.log("Request handler 'editer' w");
  reponse.writeHead(200, {'Content-Type': 'text/plain'});
  reponse.end('Hello Editeur\n');
}

function visionner(reponse) {
  console.log("Request handler 'visionner' w");
  reponse.writeHead(200, {'Content-Type': 'text/plain'});
  reponse.end('Hello Visionner\n');
}

exports.editer = editer;
exports.visionner = visionner;
