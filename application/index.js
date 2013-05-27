var serveur = require("./serveur");
var routeur = require("./routeur");
var gestReq = require("./gestionneursRequetes");

var handle = {}
handle["/"] = gestReq.editer;
handle["/editer/"] = gestReq.editer;
handle["/visionner/"] = gestReq.visionner;

serveur.start(routeur.route, handle);
