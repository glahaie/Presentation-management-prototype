
var bob = "";

$(document).ready(function(){
  $(function(){
    $( "#sortable" ).sortable({
        axis: "y",
      });
    $( "#sortable" ).disableSelection();
  });

    var ident = document.getElementById('presentationID').textContent; 
    var url = "/presentation/"+ident;
    $.ajax({
       type: "GET",
       url: url,
       error: function(error){
        if(error){
  	  console.log("Erreur");
         }
       },
       success: function(response){
         $('#remplir').html('<iframe name="test-popup" id="test-popup" class="white-popup.mfp-hide" srcdoc="'+response+'"> </iframe> '); 
          console.log($('#test-popup').html());
         },
      });

  $('.open-popup-link').magnificPopup({
     items: {
        src: '#test-popup'
       },
     type: 'iframe'
   });


}); 

