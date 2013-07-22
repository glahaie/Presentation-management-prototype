$(document).ready(function(){
  
  $('#open-pres').click(function(){
    $('#saveEditor').removeClass("ecran-mini");
    $('#saveEditor').addClass("ecran-plein");
    $('body').append($("<div id='bouton-fermer-diapo'><a href='#'>x</a></div>" ));
    $("#bouton-fermer-diapo").click( function(e) {
      $('#saveEditor').removeClass("ecran-plein");
      $('#saveEditor').addClass("ecran-mini");
      $("#bouton-fermer-diapo").remove();
    });
    $('#saveEditor').focus();
  });
  
  $('#saveEditor').keyup( function(e) {
    if (e.which == 27) {
      $('#saveEditor').removeClass("ecran-plein");
      $('#saveEditor').addClass("ecran-mini");
    }
  });
	
});

$( window ).load( function () {
  var html = function(index) {
    // uuuugh! :(
    var str = "<li><a class='thumbnail' href='#'><img class='group1 cboxElement' src='/static/images/1-INF4375-XML.png'><p class='numero-page' style='opacity: 0.35;'></p></a></li>";
    return $( str );
  };
  
  $('#thumbnails-pages ul').empty();
  $('#saveEditor').contents().find('.step').each( function(i, e) {
    $('#thumbnails-pages ul').append(html(i));
  });
  
  // Faire aparaitre la page dans l'edituer quand on clique sur son thumbnail
  // TODO: use impress.js API
  // ... $('#thumbnails-pages li').dblClick( .... )
  
});
