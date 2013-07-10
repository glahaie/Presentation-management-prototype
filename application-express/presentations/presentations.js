var htmlparser = require("htmlparser2")

var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "div" && attribs.class === "step"){
            console.log("A slide! Hooray!");
        }
    },
    ontext: function(text){
        console.log("-->", text);
    },
    onclosetag: function(tagname){
        if(tagname === "div"){
            console.log("end of slide");
        }
    }
});
parser.write(""
    + "<div id='big' class='div' data-x='3500' data-y='2100' data-rotate='180' data-scale='6'>"
    + "<p>visualize your <b>big</b> <span class='thoughts'>thoughts</span></p>"
    + "</div>");
parser.end();
