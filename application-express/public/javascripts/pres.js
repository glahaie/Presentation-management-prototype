var ident = $('#presentationID').text(); 
var iframe = ""
$(document).ready(function(){
  $('#open-pres').click(function(){ transition();}); 
  /*setTimeout( function(){
    iframe = frames[0].window.document;*/
  $(document).keyup( function(e) {
    if (e.which == 27) {
      $('#saveEditor, #tiny-iframe').css({
        "width": "400px",
        "min-width": "350px",
        "position": "relative",
        "height":"240px"
       });
     }
     $('#bouton-fermer-diapo').hide();
  });
	     
  var transition = function(){
      $('#saveEditor, #tiny-iframe').css(
		    { "position": "absolute",
			"top": "0",
			"left": "0",
			"width": "100%",
			"height": "100%"
			});
			$('#bouton-fermer-diapo').show();
    }
	
   //$.ajax(ajaxObject);
});
