var htmlparser = require('htmlparser2');
var util = require('util');
// `pageID` va etre lie' 'a l'evennement onClick des thumbnail des pages ('a droite)
var pageID = 3;

$(document).ready(function() {
  update();
});

var presentation = ''
  + '<div class="step slide" data-x="-1000" data-y="-1500">'
  + '    <h1>INF4375 - Paradigmes des échanges internet</h1>'
  + '    <h2>Introduction au XML</h2>'
  + '    <p>Jacques Berger</p>'
  + '</div>'
  + '<div id="page-2" class="step slide" data-x="0" data-y="-1500">'
  + '    <h3>Objectifs</h3>'
  + '    <ul>'
  + '        <li>L utilité de l XML</li>'
  + '        <li>Vocab</li>'
  + '        <li>blah blah blee</li>'
  + '        <li>les ouefs</li>'
  + '    </ul>'
  + '</div>'
  + '<div class="step slide" data-x="1000" data-y="-1500">'
  + '    <h3>Objectifs</h3>'
  + '    <p>Aucun</p>'
  + '</div>'
  + '<div class="step slide" data-x="1000" data-y="-1500">'
  + '    <h3>XML</h3>'
  + '    <p>Extensible Markup Language</p>'
  + '    <p>C est vraiment le «fun»</p>'
  + '</div>'
  + '<div id="title" class="step" data-x="0" data-y="0" data-scale="4">'
  + '    <span class="try">then you should try</span>'
  + '    <h1>impress.js<sup>*</sup></h1>'
  + '    <span class="footnote"><sup>*</sup> no rhyme intended</span>'
  + '</div>'
  + '<div id="its" class="step" data-x="850" data-y="3000" data-rotate="90" data-scale="5">'
  + '    <p>It s a <strong>presentation tool</strong> <br/>'
  + '    inspired by the idea behind <a href="http://prezi.com">prezi.com</a> <br/>'
  + '    and based on the <strong>power of CSS3 transforms and transitions</strong> in modern browsers.</p>'
  + '</div>'
  + '<div id="big" class="step" data-x="3500" data-y="2100" data-rotate="180" data-scale="6">'
  + '    <p>visualize your <b>big</b> <span class="thoughts">thoughts</span></p>'
  + '</div>'
  + '<div id="tiny" class="step" data-x="2825" data-y="2325" data-z="-3000" data-rotate="300" data-scale="1">'
  + '    <p>and <b>tiny</b> ideas</p>'
  + '</div>';

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


