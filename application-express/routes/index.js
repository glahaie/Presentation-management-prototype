
exports.index = function(req, res){
  res.render('presentations', { pretty: true });
};

exports.admin = function(req, res){
  res.render('gestion-admin', { pretty: true });
};

exports.presentation = function(req, res) {
  res.render('consulter-presentation', { pretty: true })
};

exports.page = function(req, res) {
  res.render('consulter-page', { pretty: true });
};

exports.vision = function(req, res) {
  console.log("Request handler 'visionner' w");
  res.end('Hello Vision\n');
};
