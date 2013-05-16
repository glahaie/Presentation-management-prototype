var serveur = require("./serveur");
var routeur = require("./routeur");

serveur.start(routeur.route);
