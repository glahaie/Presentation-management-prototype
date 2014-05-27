Online powerpoint management prototype
=======

This was a group project where the objective was to analyse and modelise
an application. We chose an application that could help students and
teachers manage the powerpoint-like presentations for their classes.

This is the prototype we realised for this project. The prototype can
display presentations, and edit them. There are also options to create new
presentations and folders. 

***

Membres
-------

  * Eric Fournier (FOUE01058109) (chef d'équipe)
  * Guillaume Lahaie (LAHG04077707)
  * Marco Gagliano (GAGM24068009)
  * Maxime Girard (GIRM30058500)

Projet et Description (Approuvé en classe ce matin)
--------------------------------------------------

Projet : Système note de cours

Description : Logiciel qui génère des présentations (acétates) à partir de documents rédigés dans un format très simple.

------------------------------------------------------------------------------------------------------------------------

Comment installer le prototype

Il faut avoir node et npm installés sur votre ordi

* $ cd application-express
* $ npm install
* $ node app.js

ou l'equivalent sur windows

------------------------------------------------------------------------------------------------------------------------

Accès au prototype:

Il est possible d'accéder au prototype de n'importe quel navigateur internet, en entrant l'adresse suivante: localhost:3000

------------------------------------------------------------------------------------------------------------------------

Problème connu:

- Problème de compatibilité entre l'éditeur wywiwyg et les navigateurs de la famille chrome. L'éditeur enlève certaines fois des attributs des tags html d'une page de présentation.
