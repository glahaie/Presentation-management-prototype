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

var bodyInnerHTML = '';

function demarerPresentation() {
    var liste = document.getElementsByClassName('step');
    document.getElementById('btnFinPresentation').style.display = 'inline';
    
    for (var i = 0; i < liste.length; i++) {
        liste[i].className = "step slide full";
    }

    impress().init();
    
}

function finPresentation() {
    var liste = document.getElementsByClassName('step');
    document.getElementById('btnFinPresentation').style.display = 'none';
    
    for (var i = 0; i < liste.length; i++) {
        liste[i].className = "step slide mini";
    }
}