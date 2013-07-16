// le code utilisé pour l'edition des presentations dans le fureteur

$(document).ready(function() {
  display(1);
  // Configurer la fonctionnalite du bouton-sauvegaruder
  $('#bouton-sauvegarder').click(function(event) {
    event.preventDefault();
    if (!$('#bouton-sauvegarder').hasClass('disabled')) {
      sauvegarder(66);
    }
  });
  
  // Ajouter une nouvelle page partie 1
  $('#bouton-ins-avant').click( function(e) {
    e.preventDefault();
    nouvellePageAvant(parseInt($("#page-id").text()));
  });
  $('#bouton-ins-apres').click( function(e) {
    e.preventDefault();
    nouvellePageAvant(parseInt(parseInt($("#page-id").text())) + 1);
  });
  
  // Faire aparaitre la page dans l'edituer quand on clique sur son thumbnail
  // (UC-E3-05 Charger la page choisie)
  $('#thumbnails-pages ul > li').each(function(index) {
    $(this).dblclick(function() {
        display(index + 1);
    });
    // Ajouter une nouvelle page partie 2
    $(this).find('.nouv-page-lien').click(function(e) {
      if ($(this).hasClass('avant')) {
        nouvellePageAvant(index);
      } else {
        nouvellePageAvant(index + 1);
      }
    });
  });
  
  $('#thumbnails-pages ul > li').on({
    mouseenter : function(e) {
      $(this).find('.nouv-page-lien').show();
    },
    mouseleave : function(e) {
      $(this).find('.nouv-page-lien').hide();
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
  //  * le onClick des thumbnails de pages. OK
  // Lieé aux ucs:
  //  * UC-E3-20 Afficher et modifier le code source
  //  * UC-E3-05 Charger la page choisie
  
  // le contenu de la page
  var pageHTML = $('#source-presentation > div').eq(pageID-1).html();
  $("#page-id").text(pageID);
  $("#editeur-page").val(pageHTML);
  
  //$('#bouton-sauvegarder').addClass("disabled"); // TODO-A ... voir en haut
}

function ordonne(pageID, page) {
  /* 
   * Change l'ordonnencement d'une page dans le doc source de la presentation
   * Déclenché par:
   *   * glissement du thumbnail de la page dans la liste des pages.
   * UC-E3-06 Changer l’ordre d’une page dans la présentation
   */
}

function nouvellePageAvant(pageID) {
  // pageAvant = 0 si inserer a la fin debut
  var nX, nY;
  var pageIndex = pageID - 1;
  var pageRef = pageID > $('#source-presentation > div').length ? 
    $('#source-presentation > div:last-of-type') :
    $('#source-presentation > div').eq(pageIndex);
  
  if (pageID > $('#source-presentation > div').length) {
    nX = parseInt(pageRef.attr('data-x')) + 1000;
    nY = parseInt(pageRef.attr('data-y'));
    pageRef.after(
      $('<div class="step slide" data-x="' + nX + '" data-y="' + nY + '">\n<p>nouvelle page<p>\n</div>\n\n')
    );
    display($('#source-presentation > div').length);
    //alert("Inserer 'a la fin! (a' X: " + nX + ", Y:" + nY + ")");
  } else {
    nX = parseInt(pageRef.attr('data-x')) - 1000;
    nY = parseInt(pageRef.attr('data-y'));
    pageRef.before(
      $('<div class="step slide" data-x="' + nX + '" data-y="' + nY + '">\n<p>nouvelle page</p>\n</div>\n\n')
    );
    display(pageID);
    //alert("Inserer avant " + pageID + " (a' X: " + nX + ", Y:" + nY + ")");
  }
  sauvegarderPres();
}

function sauvegarder(pageID) {
  // Sauvegarde le contenu de l'éditeur dans le code source de la presentation.
  // Declenche' par:
  //   * onClick du bouton sauvegarder TODO
  // Cas D'utilisation: UC-E3-09 Sauvegarder une présentation ... I guess
  
  var pageID = $('#page-id').text();
  var pageHTML = $("#editeur-page").val();
  $('#source-presentation > div').eq(pageID-1).html(pageHTML);
  $('#bouton-sauvegarder').addClass("disabled");
  sauvegarderPres();
}

function sauvegarderPres() {
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

// NOTES pour plus tards peut-etre.
// https://github.com/fb55/htmlparser2 ou
// https://github.com/tautologistics/node-htmlparser 
// live htmlparser2 demo: https://github.com/ForbesLindesay/htmlparser-demo
