import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import {
  getUserProfile,
  putUserProfile,
} from "../utilities/UserProfileUtilities";

export default function EditUserProfile({ user }) {
  // set interest cats for selection options
  const [interestCategories, setInterestCategories] = useState([]);
  // set userProfile interests, display name, and location
  const [userInterests, setUserInterests] = useState([]);
  const [userInterestsIDs, setUserInterestsIDs] = useState([]);
  const [displayName, setDisplayName] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
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

  // get interest categories using utility funct to set options available
  const userInterestCategories = async () => {
    const categories = await getInterestCategories();
    setInterestCategories(categories);
  };

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

  const handleAddLocation = (e) => {
    console.log('Location to be added', countryAdd, stateAdd, cityAdd)
    const locationAdd = {
      country: countryAdd,
      state: stateAdd,
      city: cityAdd
    }
    const updatedLocation = [...userLocation, locationAdd]
    setUserLocation([locationAdd]) //TODO: set fir st location to just locationAdd, then switch to using updatedLocation after the string "Colorado Springs" has been overwritten
  }
  console.log('userLocation', userLocation)

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
                  size={40}
                  onChange={(e) => setCountryAdd(e.target.value)}
                />
              </Form.Label>
              <Form.Label>
                Region/State
                <br />
                <input
                  name="state"
                  placeholder=" Region/State"
                  type="text"
                  size={40}
                  onChange={(e) => setStateAdd(e.target.value)}
                />
              </Form.Label>
              <Form.Label>
                City
                <br />
                <input
                  name="city"
                  placeholder="City"
                  type="text"
                  size={40}
                  onChange={(e) => setCityAdd(e.target.value)}
                />
              </Form.Label>
              <Button variant="info" onClick={(e) => handleAddLocation()}> 
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
