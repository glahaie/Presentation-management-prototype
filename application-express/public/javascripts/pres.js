var ident = $('#presentationID').text(); 
var iframe = ""
$(document).ready(function(){
  $('#open-pres').click(function(){
    transition();
  });
  
  $(document).keyup( function(e) {
    if (e.which == 27) {
      transitionBack();
    }
  });
	
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
			$('body').append($("<div id='bouton-fermer-diapo' style='display: block; position:absolute; right: 5%; top: 5%;'><a href='#'>x</a></div>" ));
			$("#bouton-fermer-diapo").click( function(e) {
			  transitionBack();
			});
    }
	
   //$.ajax(ajaxObject);
});
