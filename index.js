var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

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

// var pointsRouter = require('./app/points');

// app.use('/points', pointsRouter);
