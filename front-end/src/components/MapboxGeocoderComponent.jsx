import React, { useEffect, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapboxGeocoderComponent = () => {
    const [inputLocation, setInputLocation] = useState("")
    console.log(inputLocation)
  useEffect(() => {
    // Initialize Mapbox Geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: "pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw",
      types: 'country,region,place,postcode,locality,neighborhood',
      placeholder: "Location",
    });

    // Add geocoder to the specified container
    geocoder.addTo('#geocoder');

    // Add geocoder result to container
    geocoder.on("result", (e) => {
        setInputLocation(e.result.geometry.coordinates);
        console.log(e.result)
    });

    // Clear results container when search is cleared
    geocoder.on('clear', () => {
      result = '';
    });


  }, []);

  return (
    <div>
      <div id="geocoder" style={{ margin: '20px', minWidth: '100%' }}></div>
    </div>
  );
};

export default MapboxGeocoderComponent;