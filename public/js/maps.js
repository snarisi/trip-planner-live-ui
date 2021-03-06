function initialize_gmaps() {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 13,
	maxZoom: 20,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById('map-canvas');

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);

  // add the marker to the map
  var marker = new google.maps.Marker({
    position: myLatlng,
    title: 'Hello World!'
  });

  var markers = [];
  // draw some locations on the map
  function drawLocation(obj, type) {
    var icons = {
      hotel : '/images/lodging_0star.png',
      activity: '/images/star-3.png',
      restaurant: '/images/restaurant.png'
    }
    var opts = {};

	opts.icon = icons[type];
    opts.position = new google.maps.LatLng(
      obj.place[0].location[0],
      obj.place[0].location[1]
    );
    opts.map = map;
	
	var marker = new google.maps.Marker(opts);
    marker.name = obj.name;
	markers.push(marker);
  }

  function removeLocation(name) {
	var index;
 	var marker = markers.filter(function(marker, idx) {
		if (marker.name === name) {
			index = idx;
			return true;
		}
		return false;
	})[0];
	marker.setMap(null);
	markers.splice(index, 1);
  }
	
	function removeAllLocations() {
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
	}
	
	function extendMap() {
		var bounds = new google.maps.LatLngBounds();
		markers.forEach(function (marker) {
			bounds.extend(marker.position);
		});
		map.fitBounds(bounds);
	}

  return {
  	drawLocation : drawLocation,
	removeLocation : removeLocation,
	removeAllLocations : removeAllLocations,
	extendMap : extendMap
  };

  // var hotelLocation = [40.705137, -74.007624];
  // var restaurantLocations = [
  //       [40.705137, -74.013940],
  //       [40.708475, -74.010846]
  //     ];
  // var activityLocations = [
  //       [40.716291, -73.995315],
  //       [40.707119, -74.003602]
  //     ];

//   drawLocation(hotelLocation, {
//     icon: '/images/lodging_0star.png'
//   });
//   restaurantLocations.forEach(function(loc) {
//     drawLocation(loc, {
//       icon: '/images/restaurant.png'
//     });
//   });
//   activityLocations.forEach(function(loc) {
//     drawLocation(loc, {
//       icon: '/images/star-3.png'
//     });
//   });
}


var styleArr = [{
  featureType: 'landscape',
  stylers: [{ saturation: -100 }, { lightness: 60 }]
}, {
  featureType: 'road.local',
  stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
}, {
  featureType: 'transit',
  stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
}, {
  featureType: 'administrative.province',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'water',
  stylers: [{ visibility: 'on' }, { lightness: 30 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
}];

