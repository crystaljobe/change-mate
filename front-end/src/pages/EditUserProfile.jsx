import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card, InputGroup, FormControl } from 'react-bootstrap';
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import {
  getUserProfile,
  putUserProfile,
} from "../utilities/UserProfileUtilities";
import LocationSearchMap from "../components/LocationSearchMap";



export default function EditUserProfile({ user }) {
  // set interest cats for selection options
  const [interestCategories, setInterestCategories] = useState([]);
  // set userProfile interests, display name, and location
  const [userInterests, setUserInterests] = useState([]);
  const [userInterestsIDs, setUserInterestsIDs] = useState([]);
  const [displayName, setDisplayName] = useState([]);

  // Set userLocation to/from backend; data format is a json string object
  const [userLocation, setUserLocation] = useState('');
  const [userLocationCoords, setUserLocationCoords] = useState([])
  // console.log(userLocation, userLocationCoords)

  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // create var navigate for navigating
  const navigate = useNavigate();
  console.log(userLocationCoords)

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
    setUserLocationCoords(userProfile.coordinates);
    setDisplayName(userProfileData.display_name);
    // map through interests to set the current interests
    setUserInterests(userProfileData.interests.map((cat) => cat.category));
    setImagePreview(userProfileData.profileImage); // Set the image preview to the current profile image
    setProfileImage(userProfileData.profileImage); // Set the profile image data for possible re-upload
  };


  // upon form submit call utility function to set new user data
  const updateUserProfile = async () => {
    const responseStatus = await putUserProfile(
      user,
      userInterestsIDs,
      displayName,
      userLocation,
      profileImage,
      userLocationCoords
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

  // useEffect to call upon page render
  useEffect(() => {
    userProfile();
    userInterestCategories();
  }, []);


  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-4 mb-3">
        <Col md={2}></Col>
        <Col md={8} className="d-flex justify-content-center">
          <Card >
            <Card.Body>
              <Card.Title as="h3" className="text-center mb-3" style={{fontWeight:"bold", color:"#6840DF"}}>Edit Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="display_name">
                  <Form.Label style={{fontWeight:"bold", fontSize:"18px"}}><i className="bi bi-person-fill"></i> Display Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="location">
                  <Form.Label style={{fontWeight:"bold", fontSize:"18px"}}><i className="bi bi-geo-alt-fill"></i> Location: </Form.Label>
                  <LocationSearchMap
                    setCoords={setUserLocationCoords}
                    setAddress={setUserLocation}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="interests">
                  <Form.Label style={{fontWeight:"bold", fontSize:"18px"}}><i className="bi bi-bookmark-star-fill"></i> Interests: <span style={{fontStyle: "italic", fontWeight:"normal", fontSize:"16px"}}>To select multiple interests hold down ctrl button.</span></Form.Label>
                  <Form.Control 
                    as="select" 
                    multiple value={userInterests} 
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions);
                      const values = selectedOptions.map(option => option.value);
                      const ids = selectedOptions.map(option => parseInt(option.getAttribute('data-key')));

                      setUserInterests(values);
                      setUserInterestsIDs(ids);
                  }}>
                    {interestCategories.map((category, index) => (
                      <option key={index} data-key={category.id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileImage">
                  <Form.Label style={{fontWeight:"bold", fontSize:"18px"}}><i className="bi bi-image-fill"></i> Profile Image: </Form.Label>
                  <InputGroup >
                    <FormControl 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} />
                    {imagePreview && (
                      <img src={imagePreview} alt="Profile Preview" className="img-fluid mt-3" />
                    )}
                  </InputGroup>
                </Form.Group>
                <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit Changes
                </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}