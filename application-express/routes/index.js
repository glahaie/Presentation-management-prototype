
exports.index = function(req, res){
  res.render('index');
};

exports.editeur = function(req, res) {
  res.render('editer-page');
};

exports.vision = function(req, res) {
  console.log("Request handler 'visionner' w");
  res.end('Hello Vision\n');
};
