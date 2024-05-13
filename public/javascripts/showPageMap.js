const camp = campground;
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: camp.geometry.coordinates,
  zoom: 10
});

new mapboxgl.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${camp.title}</h3><p>${camp.location}</p>`))
  .addTo(map);
