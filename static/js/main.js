var map = L.map('map').setView([52.529, 13.341], 14);
var tischtennisPoints = L.featureGroup();
L.tileLayer('https://api.mapbox.com/styles/v1/joaosr/cj92tr4lc42p52spv77xobif7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9hb3NyIiwiYSI6ImNqOHZuMmg1ejEzbTAyd3JwdmJmNHFhdXEifQ.ZPTO-d3wGLEqu3VfOSzE6Q', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18
}).addTo(map);


$.get("https://gist.githubusercontent.com/joaosr/131e89d8839275548b91e14cace70015/raw/8af2de6eb98e5e247855c835995e358c1232c7ee/berlin_tischtennis.geojson", function(data, status){
    L.geoJSON(JSON.parse(data)).addTo(map);
});