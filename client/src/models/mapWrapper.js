var MapWrapper = function(coords, zoom, container){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.getUserLocation();
};

MapWrapper.prototype = {
  getUserLocation: function(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var coords = new google.maps.LatLng(lat, lng);
        this.googleMap.setCenter(coords);
        this.addMarker(coords);
      }.bind(this))
    }
  },

  addMarker: function(coords){
   var marker = new google.maps.Marker({
     position: coords,
     map: this.googleMap,
     icon: "http://i.imgur.com/sUxB3aV.png"
   });
 },

}


module.exports = MapWrapper;
