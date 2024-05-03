import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import {
  getUserProfile,
  putUserProfile,
} from "../utilities/UserProfileUtilities";
import LocationSearchMap from "../components/LocationSearchMap";


export default function EditUserProfile({ user }) {
  const { userProfileData, setUserProfileData } = useOutletContext();
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


  // get interest categories using utility funct to set options available
  const userInterestCategories = async () => {
    const categories = await getInterestCategories();
    setInterestCategories(categories);
  };


  // get user profile data for default values using utility funct
  const userProfile = async () => {
    const ProfileData = await getUserProfile(user);
   
    // set data
    setUserLocation(ProfileData.location);
    setUserLocationCoords(userProfile.coordinates);
    setDisplayName(ProfileData.display_name);
    // map through interests to set the current interests
    setUserInterests(ProfileData.interests.map((cat) => cat.category));
    setImagePreview(ProfileData.profileImage); // Set the image preview to the current profile image
    setProfileImage(ProfileData.profileImage); // Set the profile image data for possible re-upload
  };


  // upon form submit call utility function to set new user data
  
  const updateUserProfile = async () => {
    const upload_data = {
      interests: userInterestsIDs,
      display_name: displayName,
      location: userLocation,
      image: profileImage,
    };
    const responseStatus = await putUserProfile(upload_data
    );
    if (responseStatus) {
      setUserProfileData(responseStatus);
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

            <Row className="mb-3" style={{ justifyContent: "center" }}>
										<LocationSearchMap
											setCoords={setUserLocationCoords}
											setAddress={setUserLocation}
										/>
						</Row>

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