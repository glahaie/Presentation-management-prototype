var R = "";
var ident = $('#presentationID').text();
  
var ajaxObject = {
	type: "GET",
	url: "/presentation/presentation-demo",
	error: function(error) {
		if (error) {
			console.log("Erreur");
		}
	},
	success: function(response) {
		$('#saveEditor').html(response);
          	$('#saveEditor').hide();
		$('#start_full').click(function(){
		$('#saveEditor').show();
		transition();
});
	}
};

var transition = function(){
	$('#saveEditor, #tiny-iframe').css({ 
		"position": "absolute",
		"left": "0",
		"top": "0",
		"width": "100%",
		"height": "100%"
		});
        
} 

setInterval(function(){
    iframe = frames[0].window.document;
    $("body").on("keyup", $(iframe).defaultView, (function(e) {
	  if (e.keyCode == 27) { 
	   $('#saveEditor').hide();
       }}))}, 2000);

$.ajax(ajaxObject);


