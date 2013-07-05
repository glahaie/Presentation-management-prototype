/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: 'z4ywvtbq734tvqneh'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/presentation/:id', routes.ecran);
app.get('/presentation/:id/page', routes.page);
app.get('/presentation', routes.presentation);
app.get('/editer-presentation', routes.editPresentation);
app.get('/admin', routes.admin);
app.get('/contactez-nous', routes.contactez);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(req,res){
  res.render('404', { pretty: true});
});