var request = null;
var nomOriginal = '';
var nomGroupeOriginal = '';

$(document).ready(function(){
  
    // Permettre le click & drag des thumbnails
    $(function(){
        $( "#sortable" ).sortable({ axis: "y" });
        $( "#sortable" ).disableSelection();
    }); 
});

/**
 * Simuler la recherche d'un utilisateur à supprimer.
 */
function protoRechercheSupprimer() {
    document.getElementById("supprimerNom").value = "Gratton";
    document.getElementById("supprimerPrenom").value = "Bob";
    document.getElementById("supprimerCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("supprimerID").value = "amaricain";
    document.getElementById("supprimerProf").checked = true;
    document.getElementById("btnSupprimer").disabled = false;
}

/**
 * Simuler la recherche d'un utilisateur à modifier.
 */
function protoRechercheConMod() {
    document.getElementById("conModNom").value = "Gratton";
    document.getElementById("conModPrenom").value = "Bob";
    document.getElementById("conModCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("conModID").value = "amaricain";
    document.getElementById("conModProf").checked = true;
    document.getElementById("conModActive").checked = true;
    document.getElementById("btnModifier").disabled = false;
}

/**
 * Activer le bouton modifier.
 */
function onchangeConsulterModifier() {
    document.getElementById("btnModifier").disabled = false;
}

/**
 * Activer l'onglet donné par l'index quand l'utilisateur clique sur un tab.
 * index : Index de l'onglet.
 */
function activerTab(tabIndex) {
    var liste = document.getElementById("adminTab").getElementsByTagName("li");
    
    for (var i = 0; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

/**
 * Activer l'onglet donné par l'index quand l'utilisateur clique sur les option au lieu des tab.
 * index : Index de l'onglet.
 */
function activerOptions(tabIndex) {
    var liste = document.getElementById("adminOptions").getElementsByTagName("li");
    
    for (var i = 1; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

/**
 * Activer l'option de sélectionner un groupe de partage si la bonne option est choisie.
 * option : L'option de l'utilisateur.
 */
function enableGroupeSelect(option) {

    if (option === "groupe") {
        document.getElementById("selectGroupe").disabled = false;
    } else {
        document.getElementById("selectGroupe").disabled = true;
    }
} 

/**
 * Ajouter un membre d'un groupe de partage.
 * textId     : L'id de l'élément ou se trouve le nom du membre.
 * textareaId : L'id de textarea ou l'on ajoute le membre.
 */
function ajouterMembrePartage(textId, textareaId) {
    var membre = document.getElementById(textId).value;
    
    if (membre.length === 0) {
        return;
    }
    
    var listeMembre = document.getElementById(textareaId)

    if (listeMembre.value.length > 0) {
        listeMembre.value += "\n" + membre
    } else {
        listeMembre.value += membre
    }
        
    document.getElementById('btnModifierGroupe').disabled = false;
}

/**
 * Supprimer un membre d'un groupe de partage.
 * textId     : L'id de l'élément ou se trouve le nom du membre.
 * textareaId : L'id de textarea ou l'on trouve le membre.
 */
function supprimerMembrePartage(textId, textareaId) {
    var strlisteMembre = document.getElementById(textareaId).value;

    if (strlisteMembre.length === 0) {
        return;
    }
    
    var membre = document.getElementById(textId).value;
    var listeMembre = strlisteMembre.split("\n");
    var str = "";
    
    for (var i = 0; i < listeMembre.length; i++) {
    
        if (listeMembre[i] !== membre) {
            if (str.length === 0) {
                str += listeMembre[i];
            } else {
                str += "\n" + listeMembre[i];
            }
        }
    }
    
    document.getElementById(textareaId).value = str;
    document.getElementById('btnModifierGroupe').disabled = false;
}

/**
 * Ajouter un nouveau grouep de partage qui vient d'être créé
 */
function ajouterGroupePartage() {
    var groupe = document.getElementById('nomGroupeCreer').value;
    var listeGroupe = document.getElementById('selectGroupe').options;
    var listeGroupeSupprimer = document.getElementById('selectGroupeSupprimer').options;

    listeGroupe[listeGroupe.length] = new Option(groupe, groupe);
    listeGroupeSupprimer[listeGroupeSupprimer.length] = new Option(groupe, groupe);
    
    document.getElementById('btnModifier').disabled = false;
    resetCreerGroupePartage();
}

/**
 * Reset le formulaire pour créer un groupe de partage.
 */
function resetCreerGroupePartage() {
    document.getElementById('nomGroupeCreer').value = "";
    document.getElementById('ajoutMembre').value = "";
    document.getElementById('creerTextarea').value = "";
}

/**
 * Afficher le formulaire pour créer un groupe de partage.
 */
function afficherCreerGroupe() {
    document.getElementById('creerGroupe').style.setProperty("display", "inline");
    document.getElementById('modifierGroupe').style.setProperty("display", "none");
    document.getElementById('supprimerGroupe').style.setProperty("display", "none");
    
    document.getElementById('btnCreerGroupe').disabled = true;
}

/**
 * Afficher le formulaire pour modifier un groupe de partage.
 */
function afficherModifierGroupe() {
    document.getElementById('modifierGroupe').style.setProperty("display", "inline");
    document.getElementById('creerGroupe').style.setProperty("display", "none");
    document.getElementById('supprimerGroupe').style.setProperty("display", "none");
    
    var listeGroupe = document.getElementById('selectGroupe');
    var index = listeGroupe.selectedIndex;
    nomGroupeOriginal = listeGroupe.options[index].value;
    document.getElementById('nomGroupeModifier').value = listeGroupe.options[index].value;
    
    document.getElementById('btnModifierGroupe').disabled = true;
}

/**
 * Afficher le formulaire pour supprimer un groupe de partage.
 */
function afficherSupprimerGroupe() {
    document.getElementById('supprimerGroupe').style.setProperty("display", "inline");
    document.getElementById('creerGroupe').style.setProperty("display", "none");
    document.getElementById('modifierGroupe').style.setProperty("display", "none");
    
    var index = document.getElementById('selectGroupe').selectedIndex;
    document.getElementById('selectGroupeSupprimer').selectedIndex = index;
}

/**
 * Supprimer un groupe de partage.
 */
function supprimerGroupePartage() {
    var listeGroupeSupprimer = document.getElementById('selectGroupeSupprimer');
    var listeGroupe = document.getElementById('selectGroupe');
    var index = listeGroupeSupprimer.selectedIndex;

    listeGroupeSupprimer.remove(index);
    listeGroupe.remove(index);
    
    if (listeGroupe.options.length === 0) {
        document.getElementById('btnModifier').disabled = true;
    }
}

/**
 * Modifier un groupe de partage.
 */
function modifierGroupePartage() {
    var groupe = document.getElementById('nomGroupeModifier').value;
    var listeGroupe = document.getElementById('selectGroupe').options;
    var listeGroupeSupprimer = document.getElementById('selectGroupeSupprimer').options;
    
    for (var i = 0; i < listeGroupe.length; i++) {
        if (listeGroupe[i].value === nomGroupeOriginal) {
            listeGroupe[i].value = groupe;
            listeGroupe[i].text = groupe;
            listeGroupeSupprimer[i].value = groupe;
            listeGroupeSupprimer[i].text = groupe;
            break;
        }
    }
}

/**
 * Activer le bouton qui permet de modifier un groupe de partage.
 */
function activerBtnModifierPartage() {
    var groupe = document.getElementById('nomGroupeModifier').value;
    
    if (groupe.length > 0) {
        document.getElementById('btnModifierGroupe').disabled = false;
    } else {
        document.getElementById('btnModifierGroupe').disabled = true;
    }
}

/**
 * Activer le bouton qui permet de créer un groupe de partage.
 */
function activerBtnCreerPartage() {
    var groupe = document.getElementById('nomGroupeCreer').value;
    
    if (groupe.length > 0) {
        document.getElementById('btnCreerGroupe').disabled = false;
    } else {
        document.getElementById('btnCreerGroupe').disabled = true;
    }
}

/**
 * Changer de répertoire dans l'arborescence.
 */
function changerRepertoire(repertoire) {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire?rep=' + repertoire, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
            updateRepBreadSuivant(repertoire);
        }
    };
    
    request.send();
}

/**
 * Sauter directement au répertoire donné dans l'arborescence.
 */
function gotoRepertoire(repertoire) {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire/goto?rep=' + repertoire, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
            updateRepBread(repertoire);
        }
    };
    
    request.send();
}

/**
 * Créer un objet XMLHttpRequest s'il n'existe pas.
 */
creerObjetRequest = function() {
    try {
        request = new XMLHttpRequest();
    } catch (err) {
        request = null;
    }
}

/**
 * Créer le code html d'une arborescence de fichier/répertoire.
 * objFichierUser : Liste des fichiers/répertoires qui se trouvent dans cette arborescence et le
 *                  type d'usager.
 * return         : Le code html.
 */
function creerArborescence(objFichierUser) {
    var str = '';
    var fichiers = objFichierUser.files;
    var userType = objFichierUser.userType;
    
    if (userType === 'prof') {
        for (var i = 0; i < fichiers.length; i++) {
            nom = fichiers[i].nom;
            type = fichiers[i].type;
            
            str += 
                "<li class='dropdown'>" +
                    "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>" +
                        "<i class='icon-chevron-down'></i>" +
                    "</a>" +
                    "<ul class='dropdown-menu'>" + 
                        "<li class='disabled'><a href='#'>" + nom + "</a></li>" + 
                        "<li class='divider'></li>" +
                        "<li><a href='#'>Déplacer</a></li>" + 
                        '<li><a href="#renomerModal" role="button" data-toggle="modal" onclick="updateRenomerModal(\'' + nom + '\')\">Renomer</a></li>';
                        
                        
            if (type === 1) {
                str += '<li><a href="#supprimerRepertoireModal" role="button" data-toggle="modal" onclick="updateSupprimerRepModal(\'' + nom + '\')\">Supprimer</a></li></ul>' + 
                       "<i class='icon-folder-close'></i>" + 
                       '<a href="#" onclick="changerRepertoire(\'' + nom + '\')\">' + nom + "</a></li>";
            } else {
                str += '<li><a href="#supprimerFichierModal" role="button" data-toggle="modal" onclick="updateSupprimerFichierModal(\'' + nom + '\')\">Supprimer</a></li></ul>' + 
                       "<i class='icon-file'></i>" + 
                       '<a href="#">' + nom + "</a></li>";       
            }
        }
    } else if (userType === 'etudiant') {
        for (var i = 0; i < fichiers.length; i++) {
            nom = fichiers[i].nom;
            type = fichiers[i].type;

            if (type === 1) {
                str += "<li><i class='icon-folder-close'></i>" + 
                       '<a href="#" onclick="changerRepertoire(\'' + nom + '\')\">' + nom + "</a></li>";
            } else {
                str += "<li><i class='icon-file'></i>" + 
                       '<a href="#">' + nom + "</a></li>";       
            }
        }
    }

    return str;

}

/**
 * Retourner au répertoire racine dans l'arborescence.
 */
function setRepertoireRacine() {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire/root', true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            updateRepBreadRacine();
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
        }
    };
    
    request.send();
}

/**
 * Retourner au répertoire précédant dans l'arborescence.
 */
function repertoirePrecedent() {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire/precedent', true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
            updateRepBreadPrecedent();
        }
    };
    
    request.send();
}

/**
 * Créer un nouveau répertoire sur le compte de l'utilisateur.
 */
function creerRepertoire() {
    if (request === null) {
        creerObjetRequest();
    }
    
    var repertoireElem = document.getElementById('nomRepertoire');
    var repertoire = repertoireElem.value;
  
    request.open('GET', '/creer-repertoire?rep=' + repertoire, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            reponse = JSON.parse(request.responseText);
            
            if (reponse.success) {
                updateArborescence();
                repertoireElem.value = '';
            } else {
                afficherErreur('erreurArborescence', 'Une erreur est survenue lors de la création du répertoire.');
            }
        }
    };
    
    request.send();
}

/**
 * Créer un nouveau fichier sur le compte de l'utilisateur.
 */
function creerFichier() {
    if (request === null) {
        creerObjetRequest();
    }
    
    var fichierElem = document.getElementById('nomFichier');
    var fichier = fichierElem.value;
  
    request.open('GET', '/creer-fichier?fichier=' + fichier, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            reponse = JSON.parse(request.responseText);
            
            if (reponse.success) {
                updateArborescence();
                fichierElem.value = '';
            } else {
                afficherErreur('erreurArborescence', 'Une erreur est survenue lors de la création du fichier.');
            }
        }
    };
    
    request.send();
}

/**
 * Afficher un message d'erreur que l'utilisateur peut fermer.
 * id      : Id de l'élément ou le message d'erreur sera inséré.
 * message : Le message de l'erreur.
 */
function afficherErreur(id, message) {
    str = "<div class='alert alert-error', style='margin-top: 10px;'>" +
              "<button type='button' class='close' onclick=\"retirerErreur(\'" + id + "\')\">&times;</button>" +
          "<span id='msgErreur'>" + message + "</span></div>"
    
    document.getElementById(id).innerHTML = str;
}

/**
 * Retirer un message d'erreur.
 * id : L'id de l'élément à retirer.
 */
function retirerErreur(id) {
    document.getElementById(id).innerHTML = '';
}

/**
 * Mettre à jour la fenêtre modal qui sert à supprimer un répertoire.
 * nom : Le nom du répertoire qui sera supprimé.
 */
function updateSupprimerRepModal(nom) {
    document.getElementById('nomRepSupprimer').innerHTML = nom;
    document.getElementById("btnSupprimerRepModal").onclick = function (){supprimerRepertoire(nom);};
}

/**
 * Mettre à jour la fenêtre modal qui sert à supprimer un fichier.
 * nom : Le nom du fichier qui sera supprimé.
 */
function updateSupprimerFichierModal(nom) {
    document.getElementById('nomFichierModal').innerHTML = nom;
    document.getElementById("btnSupprimerFichierModal").onclick = function (){supprimerFichier(nom);};
}

/**
 * Supprimer un répertoire de l'usager
 * repertoire : Le nom du répertoire à supprimer.
 */
function supprimerRepertoire(repertoire) {

    if (request === null) {
        creerObjetRequest();
    }

    request.open('GET', '/supprimer-repertoire?rep=' + repertoire, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            reponse = JSON.parse(request.responseText);
            
            if (reponse.success) {
                updateArborescence();
            } else {
                afficherErreur('erreurArborescence', 'Une erreur est survenue, le répertoire ne sera pas supprimé.');
            }
        }
    };
    
    request.send();
}

/**
 * Supprimer un fichier de l'usager
 * fichier : Le nom du fichier à supprimer.
 */
function supprimerFichier(fichier) {
    if (request === null) {
        creerObjetRequest();
    }

    request.open('GET', '/supprimer-fichier?fichier=' + fichier, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            reponse = JSON.parse(request.responseText);
            
            if (reponse.success) {
                updateArborescence();
            } else {
                afficherErreur('erreurArborescence', 'Une erreur est survenue, le fichier ne sera pas supprimé.');
            }
        }
    };
    
    request.send();
}

/**
 * Avant de renomer un fichier/répertoire, conserver son nom original et mettre comme valeur
 * par défaut dans la fenêtre modal.
 * original : Le nom original du fichier/repertoire.
 */
function updateRenomerModal(original) {
    nomOriginal = original;
    document.getElementById('nouveauNom').value = original;
}

/**
 * Renommer un fichier/répertoire de l'usager
 */
function renomerFichier() {
    if (request === null) {
        creerObjetRequest();
    }
    
    var nouveauNom = document.getElementById('nouveauNom').value;
    var url = '/renomer-fichier?ancient=' + nomOriginal + '&nouveau=' + nouveauNom;
    
    request.open('GET', url, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            reponse = JSON.parse(request.responseText);
            
            if (reponse.success) {
                updateArborescence();
            } else {
                afficherErreur('erreurArborescence', 'Une erreur est survenue, le fichier ne sera pas renomé.');
            }
        }
    };
    
    request.send();
}

/**
 * Mettre à jour le répertoire courant dans l'arborescence.
 */
function updateArborescence() {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire/courant', true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
        }
    };
    
    request.send();
}

/**
 * Mettre à jour le texte qui nous indique dans quel répertoire on se trouve si on a
 * ouvert un répertoire.
 * repetoire : Le nom du répertoire suivant.
 */
function updateRepBreadSuivant(repertoire) {
    var ul = document.getElementById('repBreadcrumb');
    var listeLi = ul.getElementsByTagName('li');
    var dernierRep = document.getElementById('dernierRepBread').innerHTML;
    var str = '';
    var linkRep = '';
    var onclick = '';
    
    if (listeLi.length === 1) {
        onclick = 'onclick="setRepertoireRacine()"'
        str += '<li><a href="#" ' + onclick + '>' + dernierRep + '</a><span class="divider">/</span></li>';
        str += '<li id="dernierRepBread" class="active">' + repertoire + "</li>";
        ul.innerHTML = str;
        
        return;
    }
    
    for (var i = 0; i < listeLi.length - 1; i++) {
        if (i !== 0) {
            linkRep += listeLi[i].getElementsByTagName('a')[0].innerHTML + '/';
        }
        
        str += '<li>' + listeLi[i].innerHTML + '</li>';
    }
    
    linkRep += dernierRep;
    onclick = 'onclick="gotoRepertoire(\'' + linkRep + '\')"';
    str += '<li><a href="#" ' + onclick + '>' + dernierRep + '</a><span class="divider">/</span></li>';
    str += '<li id="dernierRepBread" class="active">' + repertoire + "</li>";
    
    ul.innerHTML = str;
}

/**
 * Mettre à jour le texte qui nous indique dans quel répertoire on se trouve si on 
 * recule d'un répertoire.
 */
function updateRepBreadPrecedent() {
    var ul = document.getElementById('repBreadcrumb');
    var listeLi = ul.getElementsByTagName('li');
    var str = '';
    
    if (listeLi.length === 1) {
        return;
    } 
    
    for (var i = 0; i < listeLi.length - 2; i++) {
        str += '<li>' + listeLi[i].innerHTML + '</li>';
    }
    
    var repertoire = listeLi[listeLi.length - 2].getElementsByTagName('a')[0].innerHTML;
    str += '<li id="dernierRepBread" class="active">' + repertoire + "</li>";
    
    ul.innerHTML = str;
}

/**
 * Mettre à jour le texte qui nous indique dans quel répertoire on se trouve si on 
 * retourne directement au répertoire racine.
 */
function updateRepBreadRacine() {
    var ul = document.getElementById('repBreadcrumb');
    var listeLi = ul.getElementsByTagName('li');
    
    if (listeLi.length > 1) {
        var listeA = listeLi[0].getElementsByTagName('a');
        ul.innerHTML = '<li id="dernierRepBread" class="active">' + listeA[0].innerHTML + '</li>';
    } else {
        var elem = document.getElementById('dernierRepBread');
        ul.innerHTML = '<li id="dernierRepBread" class="active">' + elem.innerHTML + '</li>';
    }
}

/**
 * Mettre à jour le texte qui nous indique dans quel répertoire on se trouve.
 * repertoire : Le répertoire courant.
 */
function updateRepBread(repertoire) {
    var ul = document.getElementById('repBreadcrumb');
    var listeLi = ul.getElementsByTagName('li');
    var listeRep = repertoire.split('/');
    var str = '';
    
    for (var i = 0; i < listeRep.length; i++) {
        str += '<li>' + listeLi[i].innerHTML + '</li>';
    }
    
    str += '<li id="dernierRepBread" class="active">' + listeRep[listeRep.length - 1] + '</li>';
    ul.innerHTML = str;
}
