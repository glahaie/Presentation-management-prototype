
exports.index = function(req, res){
  res.render('index');
};

exports.editeur = function(req, res) {
  console.log("Request handler 'editer' w");
  res.end('Hello Editeur\n');
}

exports.vision = function(req, res) {
  console.log("Request handler 'visionner' w");
  res.end('Hello Vision\n');
}


