var ident = $('#presentationID').text(); 
var iframe = ""
$(document).ready(function(){
  $('#open-pres').click(function(){ transition();}); 
  /*setTimeout( function(){
    iframe = frames[0].window.document;
    $("body").on("keyup", $(iframe).defaultView, (function(e) {
          if (e.keyCode == 27) { 
           $('#saveEditor, #tiny-iframe').css({
	         "width": "400px",
            "min-width": "350px",
            "position": "relative",
            "height":"240px"
	  });
       }  
    })); }, 2000);*/
     
    /*var ajaxObject = {
        type: "GET",
        url: "/presentation/presentation-demo",
        error: function(error) {
            if (error) {
                console.log("Erreur");
            }
        },
        success: function(response) {
		$('#saveEditor').html(response);
        iframeWindow = frames[0];
	  
	 }
    };*/
    
    var transition = function(){
      $('#saveEditor, #tiny-iframe').css(
		    { "position": "absolute",
			"top": "0",
			"left": "0",
			"width": "100%",
			"height": "100%",
			"display": "block"
			});
    }
	
   //$.ajax(ajaxObject);
});
