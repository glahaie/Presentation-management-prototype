var R = "";
var ident = $('#presentationID').text();
setTimeout( function(){ iframe = frames['presentation'].window.document;
$("body").on("keyup", $(iframe).defaultView, (function(e) {
	if (e.keyCode == 27) {
		$('#saveEditor, #tiny-iframe').css({
		     "width": "400px",
		     "min-width": "350px",
		     "position": "relative",
		     "height":"240px"
		   });
		$('#saveEditor').hide();
		}})); }, 2000);

var ajaxObject = {
	type: "GET",
	url: "/presentation/" + ident,
	error: function(error) {
		if (error) {
			console.log("Erreur");
		}
	},
	success: function(response) {
	console.log(response);
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
		"width": "100%",
		"height": "100%"
		});
        
} 

$.ajax(ajaxObject);




