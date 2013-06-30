
exports.index = function(req, res){
	res.render('presentations');
};

exports.presentation = function(req, res) {
	res.render('consulter-presentation');
};

exports.page = function(req, res) {
	res.render('consulter-page');
};

exports.vision = function(req, res) {
	console.log("Request handler 'visionner' w");
	res.end('Hello Vision\n');
};

exports.ecran = function(req, res){
	var fs = require('fs');
	var id = req.params.id;
	var link = './espace-utilisateur/enseignants/maxime/'+id+'.html';
	console.log(link);
	fs.readFile(link, 'utf8', function(err, data) {
		if (err) throw err;
		console.log('OK: ' + link);
		console.log(data)
		res.send(data);
	});
};
