    // Créer les paramètres de la requête
    
    var ident = $('#presentationID').text(); 
    var ajaxObject = {
        type: "Get",
        url: "/presentation/" + ident,
        error: function(error) {
            if (error) {
                console.log("Erreur");
            }
        },
        success: function(response) {//mfp-hide
            $('#saveEditor').html('<div id="tiny-pres" class="white-popup" >'+response+'</div>');
            console.log($('#test-popup').html());
        }
    };
    
    $.ajax(ajaxObject);
  
	$('#pres-button').click(
	  function(){ 
			$('.white-popup').removeAttr('id');
			$('.white-popup').attr('id', 'test-popup');
				$('.open-popup-link').magnificPopup({
					type:'inline',
					midClick: true 
				});
	         });
