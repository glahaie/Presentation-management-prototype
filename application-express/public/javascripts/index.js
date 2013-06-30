
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
         $('#test-popup').html = response; 
       },
      });

    $('.open-popup-link').magnificPopup({
       type:'inline',
       midClick: true  
       }); 
      }); 

