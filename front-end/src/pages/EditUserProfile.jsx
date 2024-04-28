import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import {
  getUserProfile,
  putUserProfile,
} from "../utilities/UserProfileUtilities";
import { getCountries, getStates, getCities } from "../utilities/CountryStateCityUtilities";

export default function EditUserProfile({ user }) {
  // set interest cats for selection options
  const [interestCategories, setInterestCategories] = useState([]);
  // set userProfile interests, display name, and location
  const [userInterests, setUserInterests] = useState([]);
  const [userInterestsIDs, setUserInterestsIDs] = useState([]);
  const [displayName, setDisplayName] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [userLocationData, setUserLocationData] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [apiCountries, setApiCountries] = useState([]);
  const [apiStates, setApiStates] = useState([]);
  const [apiCities, setApiCities] = useState([]);
  const [countryAdd, setCountryAdd] = useState("");
  const [stateAdd, setStateAdd] = useState("");
  const [cityAdd, setCityAdd] = useState("");
  // create var navigate for navigating
  const navigate = useNavigate();

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

  // get interest categories using utility funct to set options available
  const userInterestCategories = async () => {
    const categories = await getInterestCategories();
    setInterestCategories(categories);
  };

  // Gets current user locations which are a json string and converts it back to an array of objects for manipulation
  const getUserLocationData = () => {
    if (userLocation && userLocation.length > 0) {
      const locationsData = JSON.parse(userLocation)
      setUserLocationData(locationsData)
    }
  }

  useEffect(() => {
    getUserLocationData();
  }, [userLocation]);

  // get user profile data for default values using utility funct
  const userProfile = async () => {
    const userProfileData = await getUserProfile(user);
    // set data
    setUserLocation(userProfileData.location);
    setDisplayName(userProfileData.display_name);
    // map through interests to set the current interests
    setUserInterests(userProfileData.interests.map((cat) => cat.category));
    setImagePreview(userProfileData.profileImage); // Set the image preview to the current profile image
    setProfileImage(userProfileData.profileImage); // Set the profile image data for possible re-upload
  };

  console.log(userInterestsIDs)
  // upon form submit call utility function to set new user data
  const updateUserProfile = async () => {
    const responseStatus = await putUserProfile(
      user,
      userInterestsIDs,
      displayName,
      userLocation,
      profileImage
    );
    if (responseStatus) {
      navigate("/profile");
    }
  };

  // Handles adding a location to the user's profile
  const handleAddLocation = () => {
    // Create a location object from form values
    const locationAdd = {
      'country': countryAdd,
      'state': stateAdd[1],
      'city': cityAdd
    }

    // New array with the objects from userLocationData and locationAdd
    const newLocations = [...userLocationData, locationAdd]

    // Converts newLocations to json string for backend transmission
    const jsonStringLocations = JSON.stringify(newLocations)
    
    // Sets the userLocation to the new json string of locations
    setUserLocation(jsonStringLocations) 
  }

  // Handles removing a location from the user's profile
  const handleRemoveLocation = (key) => {
    // Filter through userLocationData to remove the specified location
    const filteredLocations = userLocationData.filter((_, index) => index !== key)

    // Converts filteredLocations to json string for backend transmission
    const jsonStringLocations = JSON.stringify(filteredLocations)

    // Sets the userLocation to the new json string of locations
    setUserLocation(jsonStringLocations) 
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader is an API native to browsers, reader instantiates a new object which is used to read the contents of the selected file
      const reader = new FileReader();
      // onloadend acts like an if statement and executes after the file is read
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileImage(reader.result);
      };
      // triggers the reading of the file by calling the FileReader Obj
      // converts the binary data of the file (in this case, an image) into a base64 encoded string
      reader.readAsDataURL(file);
    }
  };

  // on submit call updateProfile function to set new values
  function handleSubmit(e) {
    e.preventDefault();
    updateUserProfile();
  }

  // useEffect to call upon page render
  useEffect(() => {
    fetchCountries()
    userInterestCategories();
    userProfile();
  }, []);

  return (
    <Container>
      <br />
      <Row className="space justify-content-md-center">
        <Col md="auto">
          <h2>Edit Profile:</h2>
        </Col>
      </Row>
      
      <Row className="space justify-content-md-center">
        <Col></Col>
        <Col className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLocationSearch">
              <Form.Label>
                Country
                <br />
                <input
                  name="country"
                  placeholder="Country"
                  type="text"
                  list="countries-list" // Use the list attribute to associate with the datalist
                  size={40}
                  onChange={(e) => setCountryAdd(e.target.value)}
                />
                {/* Create a datalist with options from apiCountries */}
                <datalist id="countries-list">
                  {apiCountries.map((country, index) => (
                    <option key={index} value={country.name} />
                  ))}
                </datalist>
              </Form.Label>
              <Form.Label>
                Region/State
                <br />
                <input
                  name="state"
                  placeholder=" Region/State"
                  type="text"
                  list="states-list" // Use the list attribute to associate with the datalist
                  size={40}
                  value={stateAdd[1]} // Display only the state name
                  onChange={(e) => {
                    const selectedState = apiStates.find(state => state.name === e.target.value);
                    setStateAdd(selectedState ? [selectedState.id, selectedState.name] : []);
                  }}
                />
                {/* Create a datalist with options from apiStates */}
                <datalist id="states-list">
                  {apiStates.map((state, index) => (
                    <option key={index} value={state.name} />
                  ))}
                </datalist>
              </Form.Label>
              <Form.Label>
                City
                <br />
                <input
                  name="city"
                  placeholder="City"
                  type="text"
                  list="cities-list" // Use the list attribute to associate with the datalist
                  size={40}
                  onChange={(e) => setCityAdd(e.target.value)}
                />
                {/* Create a datalist with options from apiCities */}
                <datalist id="cities-list">
                  {apiCities.map((city, index) => (
                    <option key={index} value={city.name} />
                  ))}
                </datalist>
              </Form.Label>
              {userLocationData.length == 0 ?
                <p style={{fontStyle:'italic'}}>No locations set</p> :
                  userLocationData.map((l, k)=> 
                    <div>
                      <Button id={k} size="sm" variant="danger" onClick={(e) => handleRemoveLocation(k)} >{`Remove ${l.city},  ${l.state}`}</Button>
                    </div>
              )}
              <br />
              <Button variant="info" onClick={() => handleAddLocation()}> 
              Add Location
            </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="display_name">
              <Form.Label>
                Display Name:
                <input
                  type="text"
                  size={40}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="interests">
              <Form.Label>
                Select your areas of interest (control click to select many):
                <select
                  multiple={true}
                  size={6}
                  value={userInterests}
                  onChange={(e) => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map((option) => {
                      return option.value;
                    });
					const ids = options.map((option) => {
                      return parseInt(option.id);
                    });
                    setUserInterests(values)
					setUserInterestsIDs(ids);
                  }}
                >
                  {interestCategories &&
                    interestCategories.map((category) => (
                      <option
                        key={category.id}
                        id={category.id}
                        value={category.category}
                      >
                        {category.category}
                      </option>
                    ))}
                </select>
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileImage">
              <Form.Label>Profile Image:</Form.Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/*  This sets the location of the image preview on the screen/form*/}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Button variant="info" type="submit">
              Submit changes
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
