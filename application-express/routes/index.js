var fs = require('fs');
var REP_JACQUES = './espace-utilisateur/enseignants/jberger';
var REP_ERIC = './espace-utilisateur/etudiants/eric';
var FICHIER = 0;
var REPERTOIRE = 1;
var AUTRE = 2;

exports.index = function(req, res){
  var user = req.session.userType;
  var repertoire = req.session.repertoire;
  
  if (user === 'prof') {
  
    getFichiers(repertoire, function(err, fichiers) {
        res.render('accueil-professeur-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: user, fichiers: fichiers});
    });
    
  } else if (user === 'etudiant') {
  
    getFichiers(repertoire, function(err, fichiers) {
        res.render('accueil-etudiant-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: user, fichiers: fichiers});
    });
    
  } else {
    res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true, loggedIn: false });
  }
  
};

exports.editPresentation = function(req, res){
  var user = req.session.userType;
  var repertoire = req.session.repertoire;
  
  if (user === 'prof') {
    getFichiers(repertoire, function(err, fichiers) {
        res.render('editer-page', { pretty: true, menuPresentation: true, userType: user, fichiers: fichiers});
    });
  } else {
    res.render('404.jade', { pretty: true});
  }
  
};

exports.partagerPresentation = function(req, res){
  var user = req.session.userType;
  var repertoire = req.session.repertoire;
  
  if (user === 'prof') {
    getFichiers(repertoire, function(err, fichiers) {
        res.render('partager-presentations-professeur-layout', { pretty: true, menuPresentation: true, userType: user, fichiers: fichiers});
    });
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
    var repertoire = req.session.repertoire;
    
    if(user === 'etudiant') {
    
        getFichiers(repertoire, function(err, fichiers) {
            res.render('gestion-profil-etudiant-layout', {pretty:true, menuGestionProfil:true, loggedIn:true, userType: user, fichiers: fichiers});
        });
        
    } else if (user === 'prof') {
    
        getFichiers(repertoire, function(err, fichiers) {
            res.render('gestion-profil-professeur-layout', {pretty:true, menuGestionProfil:true, loggedIn:true, userType: user, fichiers: fichiers});
        });
        
    } else {
        res.render('404.jade', {pretty: true});
    }
};

exports.presentation = function(req, res) {
    var user = req.session.userType;
    var repertoire = req.session.repertoire;
    
    if (user === 'prof') {
    
        getFichiers(repertoire, function(err, fichiers) {
            res.render('consulter-presentations-professeur-layout', { pretty: true, menuPresentation: true, userType: user, fichiers: fichiers});
        });   
        
    } else if (user === 'etudiant') {
        
        getFichiers(repertoire, function(err, fichiers) {
            res.render('consulter-presentations-etudiant-layout', { pretty: true, menuPresentation: true, userType: user, fichiers: fichiers});
        });   
        
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
    var repertoire = req.session.repertoire;
    
    if (user === 'prof') {
    
        getFichiers(repertoire, function(err, fichiers) {
            res.render('contactez-nous-professeur-layout', { pretty: true, menuContactezNous: true, loggedIn: true, userType: user, fichiers: fichiers});
        });    
        
    } else if (user === 'etudiant') {
    
        getFichiers(repertoire, function(err, fichiers) {
            res.render('contactez-nous-etudiant-layout', { pretty: true, menuContactezNous: true, loggedIn: true, userType: user, fichiers: fichiers});
        });  
        
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
        req.session.repertoire = REP_JACQUES;
        getFichiers(REP_JACQUES, function(err, fichiers) {
            res.render('accueil-professeur-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: 'prof', fichiers: fichiers});
        });        
        
    } else if (login === 'etudiant' && password === 'etudiant') {
        req.session.userType = 'etudiant';
        req.session.repertoire = REP_ERIC;
        getFichiers(REP_ERIC, function(err, fichiers) {
            res.render('accueil-etudiant-layout', { pretty: true, menuAccueil: true, loggedIn: true, userType: 'etudiant', fichiers: fichiers})
        });
        
    } else {
        res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true, loggedIn: false, logginError: true});
    }
};

exports.logout = function(req, res) {
  req.session.userType = '';
  res.render('accueil-visiteur-layout', { pretty: true, menuAccueil: true })
};

exports.concatRepertoire = function(req, res) {
    var user = req.session.userType;
    req.session.repertoire += '/' + req.query.rep;
    var repertoire = req.session.repertoire;
    console.log(repertoire);
    
    if (user === 'prof' || user === 'etudiant') {
        getFichiers(repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
        
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.gotoRepertoire = function(req, res) {
    var user = req.session.userType;
    console.log(req.session.repertoire);
    
    if (user === 'prof') {
        req.session.repertoire = REP_JACQUES + '/' + req.query.rep;
        
        getFichiers(req.session.repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
        
    } else if (user === 'etudiant'){
        req.session.repertoire = REP_ERIC + '/' + req.query.rep;
        
        getFichiers(req.session.repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
    
    } else {
        res.render('404.jade', { pretty: true});
    }
}


function getFichiers(repertoire, callback) {
    fs.readdir(repertoire, function(err, files){
        var listeFichiers = [];
        
        if(err) {
            console.log(err);
            console.log(repertoire);
            callback(err, listeFichiers);
        }
        
        var listeFichiers = [];
        
        for (var i = 0; i < files.length; i++) {
            var lstats = fs.lstatSync(repertoire + '/' + files[i])
            var type = -1;
            var obj;
            
            if (lstats.isDirectory()) {
                type = REPERTOIRE;
                obj = {nom: files[i], type: type};
                listeFichiers.push(obj);
            } else if (lstats.isFile()) {
                var ext = getExtensionFichier(files[i]);
                
                if (ext === 'html') {
                    type = FICHIER;
                    obj = {nom: files[i], type: type};
                    listeFichiers.push(obj);
                }
            }
        }
        
        callback(err, listeFichiers);
    });
}

function getExtensionFichier(fichier) {
    var index = fichier.lastIndexOf('.');
    
    if (index !== -1) {
        return fichier.substring(index + 1);
    } else {
        return "";
    }

}

exports.root = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
        req.session.repertoire = REP_JACQUES;
        var repertoire = req.session.repertoire;
    
        getFichiers(repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
        
    } else if (user === 'etudiant') {
        req.session.repertoire = REP_ERIC;
        var repertoire = req.session.repertoire;
    
        getFichiers(repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
        
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.repertoirePrecedent = function(req, res) {
    var user = req.session.userType;
    var repertoire = req.session.repertoire;
    var root = '';
    
    if (user === 'prof') {
        root = REP_JACQUES;
    } else if (user === 'etudiant') {
        root = REP_ERIC;
    }

    if (repertoire !== root) {
        var index = repertoire.lastIndexOf('/');
        repertoire = repertoire.substring(0, index);
        req.session.repertoire = repertoire;
        
        getFichiers(repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
    } else {
        getFichiers(root, function(err, files) {
            res.json({files: files, userType: user});
        });
    }

}

exports.getContenuRepertoireCourant = function(req, res) {
    var user = req.session.userType;
    var repertoire = req.session.repertoire;
    
    if (user === 'prof' || user === 'etudiant') {
        getFichiers(repertoire, function(err, files) {
            res.json({files: files, userType: user});
        });
        
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.creerRepertoire = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
        var repertoire = req.session.repertoire + '/' + req.query.rep;
        
        fs.mkdir(repertoire, function(err) {
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                console.log(repertoire + ' créé');
                res.json({success: true});
            }
        });
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.creerFichier = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
    var fichier = req.session.repertoire + '/' + req.query.fichier + '.html';
    
        fs.writeFile(fichier, '', 'utf8', function(err) {
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                console.log(fichier + ' créé');
                res.json({success: true});
            }
        });
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.supprimerFichier = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
        var fichier = req.session.repertoire + '/' + req.query.fichier;

        fs.unlink(fichier, function(err) {
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                console.log(fichier + ' supprimé');
                res.json({success: true});
            }
        });
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.supprimerRepertoire = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
        var repertoire = req.session.repertoire + '/' + req.query.rep;

        fs.rmdir(repertoire, function(err) {
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                console.log(repertoire + ' supprimé');
                res.json({success: true});
            }
        });
    } else {
        res.render('404.jade', { pretty: true});
    }
}

exports.renomerFichier = function(req, res) {
    var user = req.session.userType;
    
    if (user === 'prof') {
        var ancientNom = req.query.ancient;
        var nouveauNom = req.query.nouveau;
        var extAncient = getExtensionFichier(ancientNom);
        var extNouveau = getExtensionFichier(nouveauNom);
        
        if (extAncient === 'html' && extNouveau !== 'html') {
            var index = nouveauNom.lastIndexOf('.');
            
            if (index > -1) {
                var temp = nouveauNom.substring(0, index + 1);
                nouveauNom = temp + 'html';
            } else {
                nouveauNom += '.html';
            }
        }
        
        var ancient = req.session.repertoire + '/' + ancientNom;
        var nouveau = req.session.repertoire + '/' + nouveauNom;

        fs.rename(ancient, nouveau, function(err) {
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                console.log(ancient + ' renomé à ' + nouveau);
                res.json({success: true});
            }
        });
    } else {
        res.render('404.jade', { pretty: true});
    }
}
