import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw";

export default function LocationSearchMap() {

}

//curl -g https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+e01010(-104.774529,38.877232)/-104.7916,38.8696,10,0/300x200@2x?access_token=pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg
// const [eventCoords, setEventCoords] = useState("");
// <Form.Group className="mb-3" controlId="event_venue_address">
//                   <Form.Label>
//                     Set Event Location:
//                     <br />
//                     <EventMap
//                       setEventCoords={setEventCoords}
//                       setEventVenueAddress={setEventVenueAddress}
//                     />
//                   </Form.Label>
//                 </Form.Group>{" "}







