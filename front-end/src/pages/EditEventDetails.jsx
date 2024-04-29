import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import EventForm from '../components/EventForm';
import { getEventDetails, updateEventDetails, deleteEvent, timeZoneAbbreviations } from '../utilities/EventUtilities';
import { getInterestCategories } from '../utilities/InterestCategoriesUtilities';
import { getCountries, getStates, getCities } from '../utilities/CountryStateCityUtilities';

export default function EditEventDetails() {
  // cucial for page to render the specific event 
  const { eventID } = useParams();
  const navigate = useNavigate();
  // set Interest Category list for user selection
  const [interestCategories, setInterestCategories] = useState([]);
  // title of the event
  const [title, setTitle] = useState('');
  // Event Start: 2024-05-01T08:45:00Z, sample data
  const [eventStart, setEventStart] = useState('');
  // Event End: 2024-05-04T08:45:00Z, sample data
  const [eventEnd, setEventEnd] = useState('');
  // time zone imported from utilities 
  const [timeZone, setTimeZone] = useState('');
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
  const [category, setCategory] = useState('');
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
  // eventCoordinates = "latitude, longitude" for static map functionality
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

  useEffect(() => {
    fetchCountries();
  }, []);

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

  // use effect to grab event details and set all useStates  
  useEffect(() => {
    const fetchEventAndCategories = async () => {
      // get category list to set selection options and set useState
      const categories = await getInterestCategories();
      setInterestCategories(categories);
      // get event details and set all useStates
      const eventDetails = await getEventDetails(eventID);
      console.log('eventDetails', eventDetails)
      setTitle(eventDetails.title);
      setEventStart(formatDateForInput(eventDetails.event_start));
      setEventEnd(formatDateForInput(eventDetails.event_end));
      setTimeZone(eventDetails.time_zone);
      setEventType(eventDetails.event_type);
      setVirtualEventLink(eventDetails.virtualEventLink || '');
      setEventVenue(eventDetails.event_venue);
      setEventVenueAddress(eventDetails.event_venue_address);
      setDescription(eventDetails.description);
      setCategory(eventDetails.category.id);
      setEventPhoto(eventDetails.event_photo);
      setPhotoPreview(eventDetails.event_photo);
      setEventCoordinates([eventDetails.lat, eventDetails.lon]);
      setLocation(eventDetails.location);
      //once be model updated uncomment below setStates:
      //setVolunteersNeeded(eventDetails.volunteers_needed)
      //setAttendeesNeeded(eventDetails.attendees_needed)
    };
    fetchEventAndCategories();
  }, [eventID]);

  // Converts to 'YYYY-MM-DDTHH:MM' to fit date field requirements for input
  const formatDateForInput = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toISOString().slice(0, 16); 
  };

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
      'country': null,
      'state': null,
      'city': null
    }

    // Sets location values to set either city, state or country
    if (cityAdd && cityAdd.length > 0) {
      locationAdd['city'] = cityAdd
    } else if (stateAdd && stateAdd.length > 0) {
      locationAdd['state'] = stateAdd[1]
    } else if (countryAdd && countryAdd.length > 0) {
      locationAdd['country'] = countryAdd
    }

    // Converts newLocations to json string for backend transmission
    const jsonStringLocation = JSON.stringify(locationAdd)
    console.log(locationAdd)
    
    // Sets the userLocation to the new json string of locations
    setLocation(jsonStringLocation) 
  }

  // Handles removing a location from the user's profile
  const handleRemoveLocation = () => {
    // Sets the userLocation to an empty string
    setLocation('') 
    setLocationData([])
  };

  // handle form submit to send put request 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseStatus = await updateEventDetails(
      eventID,
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
      volunteersNeeded,
      attendeesNeeded,
    );
    // if response status === true navigate user back to their profile
    if (responseStatus) {
      navigate('/profile');
    }
  };

  // function to handle user deleting an event
  const handleDelete = async () => {
    const responseStatus = await deleteEvent(eventID);
    if (responseStatus) {
      navigate('/profile');
    }
  };

  // return event form 
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
        //added setLocation, setEventVenueAddress, and setEventCoords to pass to location search component to set the state
        setEventCoordinates= {setEventCoordinates}
        setLocation = {setLocation}
        setEventVenueAddress={setEventVenueAddress}

        //added passing curr state for volunteersNeeded and attendeesNeeded
        volunteersNeeded={volunteersNeeded}
        attendeesNeeded={attendeesNeeded}
        //added for volunteer and attendees on click change set the opposite
        onVolunteersNeededChange={(e) => setVolunteersNeeded(!volunteersNeeded)}
        onAttendeesNeededChange={(e) => setAttendeesNeeded(!attendeesNeeded)}

        timeZoneAbbreviations={timeZoneAbbreviations}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}

        // Added passing these values and functions for location features
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
    <div className='text-center' style={{marginTop: "8px", marginBottom: "20px"}}>
    <Button variant="success" size="lg" style={{marginRight: "40px", paddingLeft: "28px", paddingRight: "28px"}} onClick={handleSubmit}>Save Changes</Button>
    <Button variant="danger" size="lg" style={{marginLeft: "40px", paddingLeft: "31px", paddingRight: "31px"}}onClick={handleDelete}>Delete Event</Button>
    </div>
    </Container>
  );
}
