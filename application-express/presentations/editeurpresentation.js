//var htmlparser = require('htmlparser2');

$(document).ready(function(){
  
    // Permettre le click & drag des thumbnails
    $("#editeur-page").val("YO YO");
    
})

var htmlStr = ""
  + "<div id='big' class='div' data-x='3500' data-y='2100' data-rotate='180' data-scale='6'>"
  + "<p>visualize your <b>big</b> <span class='thoughts'>thoughts</span></p>"
  + "</div>";

function update() {
  var s;
  /*try {
    s = (parse(htmlStr));
  } catch (ex) {
    alert(ex.message);
    return;
  }*/
  $("#edituer-page").val("YO YO");
}

/*function parse(html){
  var handler = new htmlparser.DomHandler();
  var parser = new htmlpasrer.Parser(handler);
  parser.parseComplete(html);
  return handler.dom;
}*/


