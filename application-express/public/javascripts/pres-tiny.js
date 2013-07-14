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
            $('#saveEditor').html('<div id="test-popup" class="white-popup.mfp-hide" >'+response+'</div>');
            console.log($('#test-popup').html());
        }
    };
		$.ajax(ajaxObject);
		
		$('.open-popup-link').magnificPopup({
  		  type:'inline',
		    gallery: {
				enabled: true
			  }
		});
