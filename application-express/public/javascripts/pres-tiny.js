    var ident = $('#presentationID').text(); 
    var ajaxObject = {
        type: "Get",
        url: "/presentation/" + ident,
        error: function(error) {
            if (error) {
                console.log("Erreur");
            }
        },
        success: function(response) {
            $('#saveEditor').html('<div id="test-popup" class="white-popup" >'+response+'</div>');
            console.log($('#test-popup').html());
        }
    };
    
	$.ajax(ajaxObject);
	
	
		$('.open-popup-link').magnificPopup({
		type:'inline',
		callbacks:{
			beforeOpen: function() {
                $('.white-popup').removeAttr('id');
			    $('.white-popup').attr('id', 'test-popup');
            }
		}
	});