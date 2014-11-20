var express = require('express');
var fs = require('fs');
var path = require('path');
 
var app = express();
 
app.set('port', process.env.PORT || 3000);

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.set('view engine', 'html');

app.get('*', function(req, res){
  res.render('index');
});
 
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});