function route(handle, pathname, reponse) {
  console.log("pret 'a router envers " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](reponse);
  } else {
    console.log("page not found");
    reponse.writeHead(404, {'Content-Type': 'text/plain'});
    reponse.end('404 - Non trouvable');
  }
}

exports.route = route;
