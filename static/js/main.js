var map = L.map('map').setView([52.529, 13.341], 14);
var tischtennisPoints = L.featureGroup();
L.tileLayer('https://api.mapbox.com/styles/v1/joaosr/cj92tr4lc42p52spv77xobif7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9hb3NyIiwiYSI6ImNqZThwanBqMjAxaTAyeHM2N2tiZ2xyOHgifQ.UUvBcUdzfX9U3D7OvKmAlQ', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18
}).addTo(map);


$.get("https://gist.githubusercontent.com/joaosr/131e89d8839275548b91e14cace70015/raw/ddf12cfc342728e7b9eb62b9d76ed81f21ef9a9b/berlin_tischtennis.geojson", function(data, status){
    L.geoJSON(JSON.parse(data)).addTo(map);
});