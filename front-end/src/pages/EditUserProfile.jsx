import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { putUserProfile } from "../utilities/UserProfileUtilities";

export default function EditUserProfile() {
  // set interest cats for selection options
  const [interestCategories, setInterestCategories] = useState([]);
  // set userProfile interests, display name, and location
  const { userProfileData, setUserProfileData } = useOutletContext();
  const [userInterests, setUserInterests] = useState([]);
  const [userInterestsIDs, setUserInterestsIDs] = useState([]);
  const [displayName, setDisplayName] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  // create var navigate for navigating
  const navigate = useNavigate();

  // get interest categories using utility funct to set options available
  const fetchInterestCategory = async () => {
    const categories = await getInterestCategories();
    setInterestCategories(categories);
  };

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

  // useEffect to call upon page render to get interest categories
  useEffect(() => {
    fetchInterestCategory();
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
              {userLocation.length === 0 ?
                  <p style={{fontStyle:'italic'}}>No locations set</p> :
                  userLocation.map((l, k) => (
                      <div key={k}>
                          <Button id={k} size="sm" variant="danger" onClick={(e) => handleRemoveLocation(l)}>{l}</Button>
                      </div>
                  ))
              }
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
