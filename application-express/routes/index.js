﻿exports.index = function(req, res){
  var user = req.session.userType;

  if (user === 'prof') {
    res.render('accueil-professeur-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: user});
  } else if (user === 'etudiant') {
    res.render('accueil-etudiant-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: user});
  } else {
    res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true, loggedIn: false });
  }
  
};

exports.editPresentation = function(req, res){
  var user = req.session.userType;
  
  if (user === 'prof') {
    res.render('editer-page', { pretty: true, menuPresentation: true, userType: user});
  } else {
    res.render('404.jade', { pretty: true});
  }
  
};

exports.partagerPresentation = function(req, res){
  var user = req.session.userType;
  
  if (user === 'prof') {
    res.render('partager-presentations-professeur-layout', { pretty: true, menuPresentation: true, userType: user});
  } else {
    res.render('404.jade', { pretty: true});
  }
  
};

exports.admin = function(req, res){

  if (req.session.userType === 'admin') {
    res.render('gestion-admin', { pretty: true, menuGestionUtilisateur: true });
  } else {
    res.render('404.jade', { pretty: true});
  }

};
//Tentative d'ajout de la page de compte.
exports.profil = function(req, res) {
    var user = req.session.userType;
    if(user === 'etudiant') {
        res.render('gestion-profil-etudiant-layout', {pretty:true, menuGestionProfil:true, loggedIn:true, userType: user});
    } else if (user === 'prof') {
        res.render('gestion-profil-professeur-layout', {pretty:true, menuGestionProfil:true, loggedIn:true, userType: user});
    } else {
        res.render('404.jade', {pretty: true});
    }
};

exports.presentation = function(req, res) {
  var user = req.session.userType;

  if (user === 'prof') {
    res.render('consulter-presentations-professeur-layout', { pretty: true, menuPresentation: true, userType: user});
  } else if (user === 'etudiant') {
    res.render('consulter-presentations-etudiant-layout', { pretty: true, menuPresentation: true, userType: user});
  } else {
    res.render('404.jade', { pretty: true});
  }
  
};

exports.page = function(req, res) {
  res.render('consulter-page', { pretty: true,  menuPresentation: true});
};

exports.ecran = function(req, res){
	var fs = require('fs');
	var id = req.params.id;
	var link = require('path').resolve(__dirname, '../espace-utilisateur/enseignants/maxime/'+id+'.html');
	console.log(link);
	fs.readFile(link, 'utf8', function(err, data) {
		if (err) throw err;
		console.log('OK: ' + link);
		console.log(data);
		res.send(data);
	});
};

exports.contactez = function(req, res){
  var user = req.session.userType;

  if (user === 'prof') {
    res.render('contactez-nous-professeur-layout', { pretty: true, menuContactezNous: true, loggedIn: true, userType: user});
  } else if (user === 'etudiant') {
    res.render('contactez-nous-etudiant-layout', { pretty: true, menuContactezNous: true, loggedIn: true, userType: user});
  } else {
    res.render('contactez-nous-visiteur-layout', { pretty: true, menuContactezNous: true, loggedIn: false });
  }

};

exports.login = function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  
  // login/password et session spécifique pour le prototype.
  if (login === 'admin' && password === 'admin') {
    req.session.userType = 'admin';
    res.render('gestion-admin', { pretty: true, menuGestionUtilisateur: true, loggedIn: true, userType: 'admin'})
  } else if (login === 'prof' && password === 'prof') {
    req.session.userType = 'prof';
    res.render('accueil-professeur-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: 'prof' })
  } else if (login === 'etudiant' && password === 'etudiant') {
    req.session.userType = 'etudiant';
    res.render('accueil-etudiant-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: 'etudiant' })
  } else {
    res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true, loggedIn: false, logginError: true});
  }

};

exports.logout = function(req, res) {
  req.session.userType = '';
  res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true })
};


//Recherche: on charge toujours la même page
exports.recherche = function(req, res) {
    var login = req.session.userType;
    var rech = req.body.rech;
    var msg = "login = ";
    msg += login;
    console.log(msg);

    if (login === 'prof') {
        res.render('recherche-professeur-layout', {pretty:true, menuRecherche:true, loggedIn:true, userType: login, nomRech: rech})
    } else if (login === 'etudiant') {
        res.render('recherche-etudiant-layout', {pretty:true, menuRecherche:true, loggedIn:true, userType: login, nomRech:rech})
    } else {
        res.render('404.jade', {pretty:true})
    }
};
