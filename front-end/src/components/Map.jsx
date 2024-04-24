import  { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg";

export default function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		var directions = new MapboxDirections({
			accessToken: mapboxgl.accessToken,
			unit: "metric",
			profile: "mapbox/driving",
			steps: true,
		});
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					style: "mapbox://styles/mapbox/streets-v12",
					center: [position.coords.longitude, position.coords.latitude],
					zoom: zoom,
				});
				map.current.on("move", () => {
					setLng(map.current.getCenter().lng.toFixed(4));
					setLat(map.current.getCenter().lat.toFixed(4));
					setZoom(map.current.getZoom().toFixed(2));
				});
				map.current.addControl(
					new MapboxGeocoder({
						accessToken: mapboxgl.accessToken,
						marker: {
							color: "orange",
						},
						mapboxgl: mapboxgl,
					})
				);
				directions.setOrigin([
					position.coords.longitude,
					position.coords.latitude,
				]);
				map.current.addControl(directions, "bottom-right");
			});
		}
		/*map.current.addControl(
      new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
      })
      );*/
	});

	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}
