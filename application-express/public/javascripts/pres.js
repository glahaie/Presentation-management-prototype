var R = "";
var ident = $('#presentationID').text(); 

    var ajaxObject = {
        type: "GET",
        url: "/presentation/" + ident,
        error: function(error) {
            if (error) {
                console.log("Erreur");
            }
        },
        success: function(response) {
		$('#saveEditor').html(response);
	}
    };
    
    $.ajax(ajaxObject);
