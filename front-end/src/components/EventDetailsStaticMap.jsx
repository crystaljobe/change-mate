import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken =
    "pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw";

export default function StaticMap({ lat, lng }) {
    // console.log("mapLat:", lat, "mapLon:", lng)
    const mapContainer = useRef(null);
    const map = useRef(null); // stores the initialize of map only once so it doesn't reload upon user interaction

    useEffect(() => {
        if (map.current) return; // initialize map only once
        //map setup 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 12
        });
        // console.log("Setting marker at:", lng, lat);

        // Ensure coordinates are valid numbers before placing the marker
        if (typeof lng === 'number' && typeof lat === 'number') {
            new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
        } else {
            console.error("Invalid coordinates:", lng, lat);
        }

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    }, []);

    return (
			<>
				<div ref={mapContainer} className="static-map-container"></div>
			</>
		);
}

