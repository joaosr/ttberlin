var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname+'/static')));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

router.get('/points/list', function(req, res) {
  var text = fs.readFileSync (__dirname+"/points.geojson" ,  'utf8' );
  res.send(text);
});

router.post('/points/update', function(req, res) {
  fs.writeFile(__dirname+"/points.geojson", req.body.geojson, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("file has been saved successfully");
      }
  });
  res.send(req.body.geojson);
});

app.use('/', router);
