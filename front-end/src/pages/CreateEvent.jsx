import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import EventForm from '../components/EventForm';
import { postEventDetails, timeZoneAbbreviations } from '../utilities/EventUtilities';
import { getInterestCategories } from '../utilities/InterestCategoriesUtilities';
import { getCountries, getStates, getCities } from '../utilities/CountryStateCityUtilities';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [interestCategories, setInterestCategories] = useState([]);
  // title of the event
  const [title, setTitle] = useState('');
  // needs comment for date format & how it's saved
  const [eventStart, setEventStart] = useState('');
  // needs comment for date format & how it's saved
  const [eventEnd, setEventEnd] = useState('');
  // time zone imported from utilities 
  const [timeZone, setTimeZone] = useState('America/Adak');
  // event type = In-person or Virtual
  const [eventType, setEventType] = useState('In-Person');
  // event virtual link if a virtual event (ex. - user will input their zoom link)
  const [virtualEventLink, setVirtualEventLink] = useState('');
  // event in-person venue ex-"Downtown Park Center"
  const [eventVenue, setEventVenue] = useState('');
  // eventVenueAddress = full address "123 Example St, City, St Zip"
  const [eventVenueAddress, setEventVenueAddress] = useState('');
  // event details text
  const [description, setDescription] = useState('');
  // event category for search functionality (only one cat per event)
  const [category, setCategory] = useState(1);
  // the actual photo 
  const [eventPhoto, setEventPhoto] = useState('');
  // to display a photo so the user can see what picture they have
  const [photoPreview, setPhotoPreview] = useState('');
  // Set userLocation to/from backend; data format is a json string object
  const [location, setLocation] = useState('');
  // Set userLocationData reformatted from userLocation as an array of objects for data manipulation
  const [locationData, setLocationData] = useState([]);
  // Next three set api data for auto-populated suggestions
  const [apiCountries, setApiCountries] = useState([]);
  const [apiStates, setApiStates] = useState([]);
  const [apiCities, setApiCities] = useState([]);
  // Next three set location data from form to be used in formatting and setting the userLocation
  const [countryAdd, setCountryAdd] = useState("");
  const [stateAdd, setStateAdd] = useState("");
  const [cityAdd, setCityAdd] = useState("");
  // eventCoordinates = "latitude, longitude"
  const [eventCoordinates, setEventCoordinates] = useState('');
  // boolean-volunteers needed? yes === true if no  === false 
  const [volunteersNeeded, setVolunteersNeeded] = useState(false)
  // boolean-attendees needed? yes === true if no  === false 
  const [attendeesNeeded, setAttendeesNeeded] = useState(false)

  console.log('location', location)

  // Fetches countries and sets them to apiCountries
  const fetchCountries = async () => {
    const countries = await getCountries()
    setApiCountries(countries)
  }

  // Fetches states and sets them to apiStates
  const fetchStates = async () => {
    const states = await getStates(countryAdd)
    setApiStates(states)
  }

  useEffect(() => {
    if (countryAdd) {
      fetchStates();
    }
  }, [countryAdd]);

  // Fetches CITIES and sets them to apiCities
  const fetchCities = async () => {
    const cities = await getCities(stateAdd[0])
    setApiCities(cities)
  }

  useEffect(() => {
    if (stateAdd) {
      fetchCities();
    }
  }, [stateAdd]);

   // Gets current user locations which are a json string and converts it back to an array of objects for manipulation
   const getLocationData = () => {
    if (location && location.length > 0) {
      const locationsData = JSON.parse(location)
      setLocationData(locationsData)
    }
  }

  useEffect(() => {
    getLocationData();
  }, [location]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getInterestCategories();
      setInterestCategories(categories);
    };
    fetchCategories();
    fetchCountries()
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEventPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLocation = () => {
    // Create a location object from form values
    const locationAdd = {
      'country': countryAdd,
      'state': stateAdd[1],
      'city': cityAdd
    }

    // Converts newLocations to json string for backend transmission
    const jsonStringLocation = JSON.stringify(locationAdd)
    
    // Sets the userLocation to the new json string of locations
    setLocation(jsonStringLocation) 
  }

  // Handles removing a location from the user's profile
  const handleRemoveLocation = () => {
    // Sets the userLocation to an empty string
    setLocation('') 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postEventDetails(
        title,
        eventStart,
        eventEnd,
        timeZone,
        eventType,
        eventVenue,
        eventVenueAddress,
        description,
        category,
        eventPhoto,
        virtualEventLink,
        location, 
        eventCoordinates,
        //will uncomment fields once view is updated
        // volunteersNeeded,
        // attendeesNeeded
      );
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <Container>
      <EventForm
        title={title}
        eventStart={eventStart}
        eventEnd={eventEnd}
        timeZone={timeZone}
        eventType={eventType}
        eventVenue={eventVenue}
        eventVenueAddress={eventVenueAddress}
        virtualEventLink={virtualEventLink}
        description={description}
        category={category}
        interestCategories={interestCategories}
        photoPreview={photoPreview}
        handleImageChange={handleImageChange}
        onTitleChange={(e) => setTitle(e.target.value)}
        onEventStartChange={(e) => setEventStart(e.target.value)}
        onEventEndChange={(e) => setEventEnd(e.target.value)}
        onTimeZoneChange={(e) => setTimeZone(e.target.value)}
        onEventTypeChange={(e) => setEventType(e.target.value)}
        onEventVenueChange={(e) => setEventVenue(e.target.value)}
        onEventVenueAddressChange={(e) => setEventVenueAddress(e.target.value)}
        onVirtualLinkChange={(e) => setVirtualEventLink(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onCategoryChange={(e) => setCategory(e.target.value)}

        //added for volunteer and attendees on click change set the opposite
        volunteersNeeded={volunteersNeeded}
        attendeesNeeded={attendeesNeeded}
        onVolunteersNeededChange={(e) => setVolunteersNeeded(!volunteersNeeded)}
        onAttendeesNeededChange={(e) => setAttendeesNeeded(!attendeesNeeded)}
        //added setLocation, setEventVenueAddress, and setEventCoords to pass to location search component to set the state
        setEventCoordinates= {setEventCoordinates}
        setLocation = {setLocation}
        setEventVenueAddress={setEventVenueAddress}

        timeZoneAbbreviations={timeZoneAbbreviations}
        handleSubmit={handleSubmit}

        apiCountries={apiCountries}
        apiStates={apiStates}
        apiCities={apiCities}
        stateAdd={stateAdd}
        locationData={locationData}
        setCountryAdd={setCountryAdd}
        setStateAdd={setStateAdd}
        setCityAdd={setCityAdd}
        handleAddLocation={handleAddLocation}
        handleRemoveLocation={handleRemoveLocation}
      />
      <Button variant="primary" size="lg" style={{paddingLeft: "28px", paddingRight: "28px"}} onClick={handleSubmit}>Create Event</Button>
    </Container>
  );
}
