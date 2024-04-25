import { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw";

export default function LocationSearchMap( { setEventVenueAddress, setEventCoords, setLocation }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    //set default lat/lng once user renders page geocoder should retrieve user IP location
    const [lng, setLng] = useState(-72.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(11);
    //setting the location's coordinates and address string
    useEffect(() => {
        // initialize map only once
        if (map.current) return;
        //geolocator to retrieve user lat/lng for setting use state
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    // mapbox style
                    style: "mapbox://styles/mapbox/streets-v12",
                    // center map styling
                    center: [position.coords.longitude, position.coords.latitude],
                    // use zoom usestate
                    zoom: zoom,
                });
                //recenter map based on user moving it
                map.current.on("move", () => {
                    setLng(map.current.getCenter().lng.toFixed(4));
                    setLat(map.current.getCenter().lat.toFixed(4));
                    setZoom(map.current.getZoom().toFixed(2));
                });
                //geocoder for searching address or location
                // Initialize the geocoder pass object of options
                const geocoder = new MapboxGeocoder({
                    // Set the access token
                    accessToken: mapboxgl.accessToken,
                    // Set the mapbox-gl instance
                    mapboxgl: mapboxgl,
                    //set marker on user location search
                    marker: true,
                    // Placeholder text for the search bar
                    placeholder: "Search location or enter address",
                    //sort search based on user location
                    proximity: {
                        longitude: lng,
                        latitude: lat,
                    },
                    // search parameters:
                    countries: "us",
                    language: "en",
                    autocomplete: false,
                    // limit search to address, street, and secondary address for full addresses
                    type: "address, street, secondary_address, region",
                    //limit to 6 search results in drop down
                    limit: 3,
                });
                // Add the geocoder to the map
                map.current.addControl(geocoder);
                // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
                //  Add a marker at the result's coordinates
                geocoder.on("result", (event) => {
                    const data = event.result
                    const contextArr = data.context
                    let city = ""
                    let state = ""
                    contextArr.map((context) => { 
                        if (context.id.startsWith('place')) {
                            city = context.text_en;
                        } else if (context.id.startsWith('region')) {
                            state = context.text_en;
                        }
                    })
                    //console.log(event.result)
                    
                    setEventVenueAddress(data.place_name)
                    setEventCoords(data.geometry.coordinates)
                    setLocation(`${city}, ${state}`)

                });
            });
        }
    }, []);
    return (
        <div>
            {/* map container */}
            <div ref={mapContainer} className="location-search-map-container"></div>
        </div>
    );
}
// {/* button to show currently saved name and coords */}
// <Button className="text-center" variant="info" onClick={getCoords}>
//  Set Event Location
// </Button>