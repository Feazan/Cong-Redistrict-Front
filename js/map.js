var map = L.map('map', { zoomControl: false }).setView([ 39.381266, -97.922211 ], 5);
L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGhhc2VvbiIsImEiOiJjanNjNzRlcTQwaTE0NGJtcDkxYXg0bTMzIn0.4lqy-XjXZOmpNHAolv8I1w',
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.light',
		accessToken: 'your.mapbox.access.token'
	}
).addTo(map);

// L.geoJson(mn_geojson).addTo(map);

// control that shows state info on hover
var info = L.control();

// get color depending on population density value
function getColor(d) {
	return d > 7
		? '#800026'
		: d > 6
			? '#BD0026'
			: d > 5
				? '#17EBFF'
				: d > 4 ? '#FF5530' : d > 3 ? '#bfb639' : d > 2 ? '#bf39b6' : d > 1 ? '#4562d8' : '#4ce868';
}

function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(feature.properties.CongDist)
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

function findMinnesota() {
	map.setView([ 46.39241, -94.63623 ], 7);
}

function findFlorida() {
	map.setView([ 27.994402, -81.760254 ], 7);
}

function findMaryland() {
	map.setView([ 39.045753, -76.641273 ], 7);
}

// geojson = L.geoJson(mn_geojson, {
// 	style: style,
// 	onEachFeature: onEachFeature
// }).addTo(map);

// //adding Florida and Maryland geojson data
// L.geoJson(md_geojson).addTo(map);
// L.geoJson(fl_geojson).addTo(map);
