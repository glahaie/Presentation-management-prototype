
$(document).ready(function(){
  $(function(){
    $( "#sortable" ).sortable({
        axis: "y",
      });
    $( "#sortable" ).disableSelection();
  });

  $('#start').click(function(){
    var ident = document.getElementById('presentationID').textContent; 
    var url = "/presentation/"+ident;
    $.ajax({
       type: "GET",
       dataType: "html",
       url: url,
       error: function(error){
        if(error){
  	  console.log("Erreur");
         }
       },
       success: function(response){
	alert(response);
        },
      });
     
      

   });
 
});
