// le code utilisé pour l'edition des presentations dans le fureteur

$(document).ready(function() {
  chargerThumbs();
  afficherPage(1);
  
  // Configurer la fonctionnalite du bouton-sauveguarder
  $('#bouton-sauvegarder').click(function(event) {
    event.preventDefault();
    //if (!$('#bouton-sauvegarder').hasClass('disabled')) {
    sauvegarder(parseInt($("#page-id").text()));
    //}
  });
  
  // Ajouter une nouvelle page partie 1
  $('#bouton-ins-avant').click( function(e) {
    e.preventDefault();
    nouvellePageAvant(parseInt($("#page-id").text()));
  });
  $('#bouton-ins-apres').click( function(e) {
    e.preventDefault();
    nouvellePageAvant(parseInt($("#page-id").text()) + 1);
  });
  
  // Liés la fonctionnalité de consultation de pages adjacentes pour les UCs:
  //   * UC-E3-03 Charger la page suivante
  //   * UC-E3-04 Charger la page précédente
  $('#bouton-pg-precedente').click( function (e) {
    afficherPage(parseInt($("#page-id").text()) - 1);
  });
  $('#bouton-pg-suivante').click( function (e) {
    afficherPage(parseInt($("#page-id").text()) + 1);
  });
  
  
  
  // supprimer la page avec bouton
  // Modifier les informations de la page modal en fonction de la page à
  // supprimer.
  $('#btnSupprimerPageModal').click( function() { 
    supprimer( parseInt($("#page-id").text()) );
  });
  $('#bouton-supprimer').click(function () {
    $("#noPageModal").text($("#page-id").text());
  });
  
  // TODO-A ... peut-etre. ici j'éssaie juste de désactiver le bouton 
  // sauvegarde jusqu'à qu'il y a un changement porté à la page, mais ceci ne 
  // fonctionne pas bien, donc je le laisse pour plus tard s'il reste du temps
  //$("#editeur-page").change(function() {
  //  $('#bouton-sauvegarder').removeClass("disabled");
  //});
  
});

function afficherPage (pageID) {
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
  $(".page-id").text(pageID);
  $("#page-compte").text($('#source-presentation > div').length);
  $("#editeur-page").val(pageHTML);

  //Pour le wysiwyg
  $('.wysihtml5-toolbar').remove();
  $('.wysihtml5-sandbox').remove();
  $('#editeur-page').css('display','block');
  $('#editeur-page').wysihtml5();
  
  if(pageID !== 1) {
    $('#bouton-pg-precedente').show();
  } else {
    $('#bouton-pg-precedente').hide();
  }
  if(parseInt(pageID) !== $('#source-presentation > div').length) {
    $('#bouton-pg-suivante').show();
  } else {
    $('#bouton-pg-suivante').hide();
  }
  //$('#bouton-sauvegarder').addClass("disabled"); // TODO-A ... voir en haut
}

function ordonne(pageID, page) {
  /* TODO
   * Change l'ordonnencement d'une page dans le doc source de la presentation
   * Déclenché par:
   *   * glissement du thumbnail de la page dans la liste des pages.
   * UC-E3-06 Changer l’ordre d’une page dans la présentation
   */
}

function nouvellePageAvant(pageID) {
  // pageAvant = 0 si inserer a la fin debut
  // Déclenché par:
  //   * boutons inserer avant/après dans l'éditeur de pages
  //   * botouns inserer avant/après dans thumbnails des pages
  // Cas d'utilisation: UC-E3-01 Insérer une nouvelle page OK
  var nX, nY;
  var pageIndex = pageID - 1;
  var pageRef = pageID > $('#source-presentation > div').length ? 
    $('#source-presentation > div:last-of-type') :
    $('#source-presentation > div').eq(pageIndex);
  
  if (pageID > $('#source-presentation > div').length) {
    nX = parseInt(pageRef.attr('data-x')) + 1000;
    nY = parseInt(pageRef.attr('data-y'));
    pageRef.after(
      $('<div class="step slide" data-x="' + nX + '" data-y="' + nY + '">\n<p>nouvelle page</p>\n</div>')
    );
    afficherPage($('#source-presentation > div').length);
  } else {
    nX = parseInt(pageRef.attr('data-x'));
    nY = parseInt(pageRef.attr('data-y'));
    pageRef.before(
      $('<div class="step slide" data-x="' + nX + '" data-y="' + nY + '">\n<p>nouvelle page</p>\n</div>')
    );
    // On tasse tout par la gauche ... aweille'
    pageRef.nextAll().add(pageRef).attr('data-x', function(i, val){
      return parseInt(val) + 1000;
    });
    
    afficherPage(pageID);
  }
  sauvegarderPres();
}

function supprimer(pageID) {
  // Supprime une page de la presentation
  // Declenche' par:
  //   * clique du bouton supprimer OK
  // UC-E3-02 Supprimer une page 
  if ($('#source-presentation > div').length === 1) {
    alert("!! Une présentation doit avoir au moins une page.");
    return;
  }
  
  $('#source-presentation > div').eq(pageID - 1).remove();
  if (pageID > $('#source-presentation > div').length) {
    afficherPage(pageID - 1); 
  } else { 
    afficherPage(pageID);
  }
  sauvegarderPres();
}

function sauvegarder(pageID) {
  // Sauvegarde le contenu de l'éditeur dans le code source de la presentation.
  // Declenche' par:
  //   * onClick du bouton sauvegarder OK
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
    alert("La présentation à était mise à jour");
    chargerThumbs();
  });
  request.fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus );
  });
  $('#bouton-sauvegarder').removeClass("disabled");
}

// TODO: Mettre ce code dans `consulter presentation` et autres places o'u c'est necessaire.
function chargerThumbs() {
  
  var html = function(index) {
    // uuuugh! :(
    var str = "<li style='text-align:center;'><p class='nouv-page-lien avant' style='display:none;' href='#'><a href='#' title='inserer page ici'><i class='icon-plus'></i></a></p><a class='thumbnail' href='#'><img class='group1 cboxElement' src='/static/images/1-INF4375-XML.png'><p class='numero-page' style='opacity: 0.35;'>" + (index+1) + "</p></a><p class='nouv-page-lien' style='display:none;'><a href='#' title='inserer page ici'><i class='icon-plus'></i></a></p></li>";
    return $( str );
  };
  $('#thumbnails-pages ul').empty();
  $('#source-presentation > div').each( function(i, e) {
    $('#thumbnails-pages ul').append(html(i));
  });
  
  // Faire aparaitre la page dans l'edituer quand on clique sur son thumbnail
  // (UC-E3-05 Charger la page choisie)
  $('#thumbnails-pages ul > li').each( function(i) {
    $(this).dblclick(function() {
      afficherPage(i + 1);
    });
    $(this).find('.nouv-page-lien').click(function(e) {
      if ($(this).hasClass('avant')) {
        nouvellePageAvant(i + 1);
      } else {
        nouvellePageAvant(i + 2);
      }
    });
  });
  // Ajouter une nouvelle page avec boutons des thumbs
  
  // Montrer et cacher les boutons pour creer nouvelle pages
  $('#thumbnails-pages ul > li').on({
    mouseenter : function(e) {
      $(this).find('.nouv-page-lien').show();
    },
    mouseleave : function(e) {
      $(this).find('.nouv-page-lien').hide();
    }
  });
}


// NOTES pour plus tards peut-etre.
// https://github.com/fb55/htmlparser2 ou
// https://github.com/tautologistics/node-htmlparser 
// live htmlparser2 demo: https://github.com/ForbesLindesay/htmlparser-demo
