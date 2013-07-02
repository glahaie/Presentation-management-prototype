
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
     //    $('#remplir').html('<iframe name="test-popup" id="test-popup" class="white-popup.mfp-hide" srcdoc="'+response+'"> </iframe> '); 
          $('#remplir').html('<div id="test-popup" class="white-popup mfp-hide" >'+response+'</div>');
          console.log($('#test-popup').html());
         },
      });

$('.open-popup-link').magnificPopup({
	type:'inline',
	midClick: true 
});

function protoRechercheSupprimer() {
    document.getElementById("supprimerNom").value = "Gratton";
    document.getElementById("supprimerPrenom").value = "Bob";
    document.getElementById("supprimerCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("supprimerID").value = "amaricain";
    document.getElementById("supprimerProf").checked = true;
    document.getElementById("btnSupprimer").disabled = false;
}

function protoRechercheConMod() {
    document.getElementById("conModNom").value = "Gratton";
    document.getElementById("conModPrenom").value = "Bob";
    document.getElementById("conModCourriel").value = "bob.gratton@canada.ca";
    document.getElementById("conModID").value = "amaricain";
    document.getElementById("conModPassword").value = "thinkbig";
    document.getElementById("conModProf").checked = true;
    document.getElementById("conModActive").checked = true;
    document.getElementById("btnModifier").disabled = true;
}

function onchangeConsulterModifier() {
    document.getElementById("btnModifier").disabled = false;
}

function activerTab(tabIndex) {
    var liste = document.getElementById("adminTab").getElementsByTagName("li");
    
    for (var i = 0; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

function activerOptions(tabIndex) {
    var liste = document.getElementById("adminOptions").getElementsByTagName("li");
    
    for (var i = 1; i < liste.length; i++) {
        if (i !== tabIndex) {
            liste[i].className = "";
        }
    }
    
    liste[tabIndex].className = "active";
}

  /*$('.open-popup-link').magnificPopup({
     items: {
        src: '#test-popup'
       },
     type: 'iframe'
   });*/


}); 

