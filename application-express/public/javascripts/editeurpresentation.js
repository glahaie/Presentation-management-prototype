// le code utilisé pour l'edition des presentations dans le fureteur

$(document).ready(function() {
  display(1);
  $('#bouton-sauvegarder').click(function(event) {
    event.preventDefault();
    if (!$('#bouton-sauvegarder').hasClass('disabled')) {
      sauvegarder(66);
    }
  });
  // TODO-A ... peut-etre. ici j'éssaie juste de désactiver le bouton 
  // sauvegarde jusqu'à qu'il y a un changement porté à la page, mais ceci ne 
  // fonctionne pas bien, donc je le laisse pour plus tard s'il reste du temps
  
  //$("#editeur-page").change(function() {
  //  $('#bouton-sauvegarder').removeClass("disabled");
  //});
  
});

function display(pageID) {
  // Affiche le code source d'une page dans l'editeur.
  // Elle devrait être déclenchée par:
  //  * le chargement de l'interface d'édition d'une présentation 
  //    (voir UC-E1-03). OK
  //  * le onClick des thumbnails de pages. TODO
  // Lieé au UC-E3-20 Afficher et modifier le code source
  
  //TODO: extraire le titre et l'inserer quelque part dans l'interface 
  var pageHTML = $('#source-presentation > div').eq(pageID-1).html();
  $("#page-id").text(pageID);
  $("#editeur-page").val(pageHTML);
  //$('#bouton-sauvegarder').addClass("disabled"); // TODO-A ... voir en haut
}

function sauvegarder(pageID) {
  /* Sauvegarde le contenu de l'éditeur dans le code source de la presentation.
   * Declenche' par:
   *   * onClick du bouton sauvegarder TODO
   * Cas D'utilisation: UC-E3-09 Sauvegarder une présentation ... I guess
   */
  var pageID = $('#page-id').text();
  var pageHTML = $("#editeur-page").val();
  $('#source-presentation > div').eq(pageID-1).html(pageHTML);
  $('#bouton-sauvegarder').addClass("disabled");
  // Envoyer nouveau code presentation au serveur pour sauvegarder
  var request = $.ajax({
    url : "/ajax/presentation",
    type : "POST",
    data : { htmlPres : $('#source-presentation').html()},
    dataType : "html"
  });
  request.done(function(data) {
    $("#source-presentation").html( data );
    alert("Page sauvegardée");
  });
  request.fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus );
  });
  $('#bouton-sauvegarder').removeClass("disabled");
}

function ordonne(pageID, page) {
  /* 
   * Change l'ordonnencement d'une page dans le doc source de la presentation
   * Déclenché par:
   *   * glissement du thumbnail de la page dans la liste des pages.
   * UC-E3-06 Changer l’ordre d’une page dans la présentation
   */
}

// NOTES pour plus tards peut-etre.
// https://github.com/fb55/htmlparser2 ou
// https://github.com/tautologistics/node-htmlparser 
// live htmlparser2 demo: https://github.com/ForbesLindesay/htmlparser-demo
