import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Marker } from 'react-map-gl';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw";

export default function StaticMap({ latitude, longitude }) {
    console.log("mapLat:", latitude, "mapLon:", longitude)
    const mapContainer = useRef(null);
    const map = useRef(null); // stores the initialize of map only once so it doesn't reload upon user interaction
    const [marker, setMarker] = useState([])
    console.log("marker:", marker)
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: 12
        });

        // //recenter map based on user moving it
        // map.current.on("move", () => {
        //     setLng(map.current.getCenter().lng.toFixed(4));
        //     setLat(map.current.getCenter().lat.toFixed(4));
        //     setZoom(map.current.getZoom().toFixed(2));
        // });
        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        setMarker(new mapboxgl.Marker().setLngLat({lgn: longitude, lat: latitude}).addTo(map.current))
        
        // Clean up on unmount
        // return () => map.remove();
    }, []);

    return (
			<>
				<div ref={mapContainer} className="static-map-container"></div>
			</>
		);
}

// curl -g https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+e01010(-104.774529,38.877232)/-104.7916,38.8696,10,0/300x200@2x?access_token=pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg

    

// const [viewport, setViewport] = useState({
//     latitude: latitude,
//     longitude: longitude,
//     zoom: 11,
//     width: '100vw',
//     height: '100vh',
//   });
{/* <ReactMapGL className="static-map-container"
					{...viewport}
					accessToken={mapboxgl.accessToken}
					onViewportChange={(newViewport) => setViewport(newViewport)}>
					<Marker latitude={latitude} longitude={longitude}>
						<div>Marker</div>
					</Marker>
				</ReactMapGL> */}


