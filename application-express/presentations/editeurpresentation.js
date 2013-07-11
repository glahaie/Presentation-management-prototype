var htmlparser = require('htmlparser2');
var util = require('util');
// `pageID` va etre lie' 'a l'evennement onClick des thumbnail des pages ('a droite)
var pageID = 3;

$(document).ready(function() {
  update();
});

/*
 * Affiche le code source d'une page dans l'editeur.
 * Declanche' par le onClick des thumbnails de pages.
 * UC-E3-20 Afficher et modifier le code source
 */
function display(obj, pageID) {
  function fixup(obj) {
    if (Array.isArray(obj)) return obj.map(fixup);
    if (typeof obj != 'object') return obj;
    if (obj.prev) obj.prev = obj;
    if (obj.next) obj.next = obj;
    if (obj.children) obj.children = fixup(obj.children);
    return obj;
  }
  //output.setValue(util.inspect(fixup(obj), false, 10, false));
  $("#editeur-page").val(util.inspect(fixup(obj[pageID-1]), false, 10, false));
}

/* Sauvegarde l'objet DOM contenant le code source de la page dans le code
 * source de la presentation.
 * Declanche' par onClick du bouton sauvegarder:
 * Cas D'utilisation: UC-E3-09 Sauvegarder une présentation ... I guess
 */
function sauvegarder(obj, pageID) {}

/* 
 * Change l'ordonnencement d'une page dans le doc source de la presentation
 *
 * UC-E3-06 Changer l’ordre d’une page dans la présentation
 */
function ordonne(pageID, page) {}

function update() {
  var dom;
  var presentation = $("#source-presentation").text();
  try {
    dom = (parse(presentation));
  } catch (ex) {
    alert(ex.message);
    return;
  }
  display(dom, pageID);
}

function parse(html){
  var handler = new htmlparser.DomHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(html);
  return handler.dom;
}


