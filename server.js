var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path');
 
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

app.post('/api/sendMail', function(req, res){
  var emailInfo = req.body;

  var sg_username = "matheusrma";
  var sg_password = "hackpucs27";

  var sendgrid = require("sendgrid")(sg_username, sg_password);

  sendgrid.send({
    to:       emailInfo.to,
    from:     'espalheamorazul@gmail.com',
    subject:  emailInfo.name + ' te mandou amor!',
    text:     'Começou a espalhaçao de amorzinho s2 s2.'
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
});
 
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});