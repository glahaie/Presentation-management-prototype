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
	
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
	var transitionBack = function() {
	  $('#saveEditor, #tiny-iframe').css({
      "width": "400px",
      "min-width": "350px",
      "position": "relative",
      "height":"240px"
    });
    $("#bouton-fermer-diapo").remove();
  }
  
  var transition = function(){
      $('#saveEditor, #tiny-iframe').css(
		    { "position": "absolute",
			"top": "0",
			"left": "0",
			"width": "100%",
			"height": "100%"
			});
			$('body').append($("<div id='bouton-fermer-diapo' style='display: block; position:absolute; right: 5%; top: 5%; z-index:21;'><a href='#'>x</a></div>" ));
			$("#bouton-fermer-diapo").click( function(e) {
			  transitionBack();
			});
    }
	
>>>>>>> 59f9b59f3d492a12d0a2f2decf494f2b05c31f54
>>>>>>> ebb6def408d29a37a234801385926175e68fa3af
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

function transitionBack() {
  $('#saveEditor, #tiny-iframe').css({
    "width": "400px",
    "min-width": "350px",
    "position": "relative",
    "height":"240px"
  });
  $("#bouton-fermer-diapo").remove();
}

function transition() {
  $('#saveEditor, #tiny-iframe').css({ 
    "position": "absolute",
	  "top": "0",
	  "left": "0",
	  "width": "100%",
	  "height": "100%"
	});
	$('body').append($("<div id='bouton-fermer-diapo' style='display: block; position:absolute; right: 5%; top: 5%;'><a href='#'>x</a></div>" ));
	$("#bouton-fermer-diapo").click( function(e) {
	  transitionBack();
	});
}
  
  
