var map = L.map('map').setView([52.529, 13.341], 14);
var tischtennisPoints = L.featureGroup();
var currentTTPoint;

map.addLayer(tischtennisPoints);

$.get("/points/list", function(data, status){
    var n = L.geoJSON(JSON.parse(data));
    n.eachLayer(function(layer){
      tischtennisPoints.addLayer(layer);
    });
    tischtennisPoints.on('layeradd', function(layer){
      update();
    });

    tischtennisPoints.on('layerremove', function(layer){
      update();
    });
    addClickEventToPoint();
});

function addClickEventToPoint(){
  tischtennisPoints.eachLayer(function(layer){
    layer.on('click', function(e){
        L.DomEvent.preventDefault(e);
        L.DomEvent.stopPropagation(e);
        var r = confirm("Delete Tischtennis!");
        if (r == true) {
            tischtennisPoints.removeLayer(layer);
        }
    });
  });
}

function addEventsToMap(){
  map.on('click', function(e) {
    L.DomEvent.preventDefault(e);
    L.DomEvent.stopPropagation(e);
    if(!currentTTPoint){
      return;
    }

    if(!currentTTPoint.clicked){
        currentTTPoint.marker.setLatLng(e.latlng);
        currentTTPoint.clicked=true;
        var r = confirm("Save Tischtennis!");
        if (r == false) {
            currentTTPoint.clicked=false;
            currentTTPoint.remove();
            currentTTPoint = null;
            btnAddPoint.state('add-tischtennis');
        } else {
            currentTTPoint.clicked=true;
            map.removeLayer(currentTTPoint.marker);
            tischtennisPoints.addLayer(currentTTPoint.marker);
            btnAddPoint.state('add-tischtennis');
        }
    }

  });

  map.on('mousemove', function(e) {
    if(!currentTTPoint){
      return;
    }

    if(!currentTTPoint.clicked){
        currentTTPoint.marker.setLatLng(e.latlng);
    }
  });
}

function update(){
  var dataPOST = {geojson: JSON.stringify(tischtennisPoints.toGeoJSON())};
  $.post("/points/update", dataPOST,function(data, status){
      console.log(status);
      addClickEventToPoint();
  });
}

function TTPoint(_map) {
  var vm = this;
  vm.map = _map;
  vm.marker;
  vm.clicked=false;
  vm.remove=remove;

  function init() {
    vm.marker = L.marker([50.5, 30.5]).addTo(vm.map);
  }

  function remove(){
      vm.map.removeLayer(vm.marker);
  }

  init();
}

var btnAddPoint = L.easyButton({
    states: [{
            stateName: 'add-tischtennis',        // name the state
            icon:      '<span class="textButton">+</span>',               // and define its properties
            title:     'Add new Tischtennis',      // like its title
            onClick: function(btn, map) {       // and its callback
                currentTTPoint = new TTPoint(map);
                btn.state('cancel-tischtennis');    // change state on click!
            }
        }, {
            stateName: 'cancel-tischtennis',
            icon:      '<span class="textButton">x</span>',
            title:     'Cancel new Tischtennis',
            onClick: function(btn, map) {
                currentTTPoint.remove();
                currentTTPoint = null;
                btn.state('add-tischtennis');
            }
    }]
}).addTo(map);

addEventsToMap();

L.tileLayer('https://api.mapbox.com/styles/v1/joaosr/cj92tr4lc42p52spv77xobif7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9hb3NyIiwiYSI6ImNqOHZuMmg1ejEzbTAyd3JwdmJmNHFhdXEifQ.ZPTO-d3wGLEqu3VfOSzE6Q', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18
}).addTo(map);
