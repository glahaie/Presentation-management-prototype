
exports.index = function(req, res){
  res.render('presentations');
};

exports.presentation = function(req, res) {
  res.render('consulter-presentation')
};

exports.page = function(req, res) {
  res.render('consulter-page');
};

exports.vision = function(req, res) {
  console.log("Request handler 'visionner' w");
  res.end('Hello Vision\n');
};
