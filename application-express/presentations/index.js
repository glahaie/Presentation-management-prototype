var fs = require("fs");
var path = require("path");

/* finds a presentation and loads into something or other... */
function chargerPresentation (){
  var data;
  var filepath = path.join(__dirname, '../espace-utilisateur/enseignants/jberger/presentation-demo.html');
  fs.exists(filepath, function(exists) {
    if (exists) {
      fs.stat(filepath, function(error, stats) {
        fs.open(filepath, "r", function(error, fd) {
          var buffer = new Buffer(stats.size);
          fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
            data = buffer.toString("utf8", 0, buffer.length);
            console.log(data);
            fs.close(fd);
          });
        });
      });
    }
  });
}
exports.chargerPresentation = chargerPresentation;
