var request = null;

$(document).ready(function(){
  
    // Permettre le click & drag des thumbnails
    $(function(){
        $( "#sortable" ).sortable({ axis: "y" });
        $( "#sortable" ).disableSelection();
    }); 
});

function protoRechercheSupprimer() {
    document.getElementById("supprimerNom").value = "Gratton";
    document.getElementById("supprimerPrenom").value = "Bob";
    document.getElementById("supprimerCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("supprimerID").value = "amaricain";
    document.getElementById("supprimerProf").checked = true;
    document.getElementById("btnSupprimer").disabled = false;
}

function protoRechercheConMod() {
    document.getElementById("conModNom").value = "Gratton";
    document.getElementById("conModPrenom").value = "Bob";
    document.getElementById("conModCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("conModID").value = "amaricain";
    document.getElementById("conModProf").checked = true;
    document.getElementById("conModActive").checked = true;
    document.getElementById("btnModifier").disabled = false;
}

function onchangeConsulterModifier() {
    document.getElementById("btnModifier").disabled = false;
}

function activerTab(tabIndex) {
    var liste = document.getElementById("adminTab").getElementsByTagName("li");
    
    for (var i = 0; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

function activerOptions(tabIndex) {
    var liste = document.getElementById("adminOptions").getElementsByTagName("li");
    
    for (var i = 1; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

function enableGroupeSelect(option) {

    if (option === "groupe") {
        document.getElementById("selectGroupe").disabled = false;
    } else {
        document.getElementById("selectGroupe").disabled = true;
    }
} 

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

function ajouterGroupePartage() {
    var groupe = document.getElementById('nomGroupeCreer').value;
    var listeGroupe = document.getElementById('selectGroupe').options;
    var listeGroupeSupprimer = document.getElementById('selectGroupeSupprimer').options;

    listeGroupe[listeGroupe.length] = new Option(groupe, groupe);
    listeGroupeSupprimer[listeGroupeSupprimer.length] = new Option(groupe, groupe);
    
    document.getElementById('btnModifier').disabled = false;
    resetCreerGroupePartage();
}

function resetCreerGroupePartage() {
    document.getElementById('nomGroupeCreer').value = "";
    document.getElementById('ajoutMembre').value = "";
    document.getElementById('creerTextarea').value = "";
}

function afficherCreerGroupe() {
    document.getElementById('creerGroupe').style.setProperty("display", "inline");
    document.getElementById('modifierGroupe').style.setProperty("display", "none");
    document.getElementById('supprimerGroupe').style.setProperty("display", "none");
    
    document.getElementById('btnCreerGroupe').disabled = true;
}

var nomGroupeOriginal = '';

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

function afficherSupprimerGroupe() {
    document.getElementById('supprimerGroupe').style.setProperty("display", "inline");
    document.getElementById('creerGroupe').style.setProperty("display", "none");
    document.getElementById('modifierGroupe').style.setProperty("display", "none");
    
    var index = document.getElementById('selectGroupe').selectedIndex;
    document.getElementById('selectGroupeSupprimer').selectedIndex = index;
}

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

function activerBtnModifierPartage() {
    var groupe = document.getElementById('nomGroupeModifier').value;
    
    if (groupe.length > 0) {
        document.getElementById('btnModifierGroupe').disabled = false;
    } else {
        document.getElementById('btnModifierGroupe').disabled = true;
    }
}

function activerBtnCreerPartage() {
    var groupe = document.getElementById('nomGroupeCreer').value;
    
    if (groupe.length > 0) {
        document.getElementById('btnCreerGroupe').disabled = false;
    } else {
        document.getElementById('btnCreerGroupe').disabled = true;
    }
}

function changerRepertoire(repertoire) {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire?rep=' + repertoire, true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
        }
    };
    
    request.send();
}

creerObjetRequest = function() {
    try {
        request = new XMLHttpRequest();
    } catch (err) {
        request = null;
    }
}

function creerArborescence(fichiers) {
    var str = '';

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
                    "<li><a href='#'>Renommer</a></li>" +
                    "<li><a href='#'>Supprimer</a></li>" + 
                "</ul>";
                
        if (type === 1) {
            str += "<i class='icon-folder-close'></i>" + 
                   '<a href="#" onclick="changerRepertoire(\'' + nom + '\')\">' + nom + "</a></li>";
        } else {
            str += "<i class='icon-file'></i>" + 
                   '<a href="#">' + nom + "</a></li>";       
        }
    }

    return str;

}

function setRepertoireRacine() {
    if (request === null) {
        creerObjetRequest();
    }
  
    request.open('GET', '/repertoire/root', true);
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            document.getElementById('fichiers').innerHTML = creerArborescence(JSON.parse(request.responseText));
        }
    };
    
    request.send();
}

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
                // refresh l'arborescence
                repertoireElem.value = '';
            } else {
                afficherErreurArborescence('Une erreur est survenue lors de la création du répertoire.');
            }
        }
    };
    
    request.send();
}

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
                // refresh l'arborescence
                fichierElem.value = '';
            } else {
                afficherErreurArborescence('Une erreur est survenue lors de la création du fichier.');
            }
        }
    };
    
    request.send();
}

function afficherErreurArborescence(message) {
    str = "<div class='alert alert-error', style='margin-top: 10px;'>" +
              "<button type='button' class='close' onclick='retirerErreurArborescence()'>&times;</button>" +
          "<span id='msgErreur'>" + message + "</span></div>"

    document.getElementById("erreurArborescence").innerHTML = str;
}

function retirerErreurArborescence() {
        document.getElementById("erreurArborescence").innerHTML = '';
}


