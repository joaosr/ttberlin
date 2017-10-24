var express = require("express");
var router = express.Router();
var uuid = require('node-uuid');
var fs = require('fs');

var getObjectPoints = function(){
  return JSON.parse(fs.readFileSync(__dirname+"/points.geojson" , 'utf8'));
}

var saveObjectPoints = function(points){
  fs.writeFile(__dirname+"/points.geojson", points, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("file has been saved successfully");
      }
  });
}

var startPoint = function(point){
  point['properties'] = point['properties'] || {};
  point['properties']['id'] = uuid.v1();
  return point;
}

var addPoint = function(point){
    var points = getObjectPoints();
    points['features'].push(point);
    return points;
}

var removePoint = function(id){
    var points = getObjectPoints();
    var index = points['features'].findIndex(function(p){
        return p['properties']['id'] == id;
    });

    points['features'].splice(index, 1);

    return points;
}


router.get('/list', function(req, res) {
  var text = fs.readFileSync (__dirname+"/points.geojson" ,  'utf8' );
  res.send(text);
});

router.post('/add', function(req, res) {
  var point = startPoint(JSON.parse(req.body.point));
  var points = addPoint(point);
  saveObjectPoints(JSON.stringify(points));
  res.send(JSON.stringify(point));
});

router.post('/remove', function(req, res) {
  var points = removePoint(req.body.id);
  saveObjectPoints(JSON.stringify(points));
  res.send(req.body.id);
});

module.exports = router;
