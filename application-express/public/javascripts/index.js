
$(document).ready(function(){
  $(function(){
    $( "#sortable" ).sortable({
        axis: "y",
      });
    $( "#sortable" ).disableSelection();
  });

 // $('#start').click(function(){

 

/*    var ident = document.getElementById('presentationID').textContent; 
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
          alert("Response: "+ response);
       },
      });
*/    

   //});

   $(".group1").colorbox({rel:'group1', transition:"fade"});

 
});
