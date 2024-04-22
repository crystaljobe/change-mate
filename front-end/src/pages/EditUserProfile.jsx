import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AddressAutofill } from '@mapbox/search-js-react';
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { getUserProfile, putUserProfile } from "../utilities/UserProfileUtilities";

export default function EditUserProfile({user}) {
	// set interest cats for selection options
	const [interestCategories, setInterestCategories] = useState([]);
	// set userProfile interests, display name, and location
	const [userInterests, setUserInterests] = useState([]);
	const [displayName, setDisplayName] = useState([]);
    const [userLocation, setUserLocation] = useState([])
	const [profileImage, setProfileImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
	// create var navigate for navigating 
	const navigate = useNavigate();

	// get interest categories using utility funct to set options available
	const userInterestCategories = async () => {
		const categories = await getInterestCategories();
		setInterestCategories(categories);
	};

	// get user profile data for default values using utility funct
	const userProfile = async() => {
		const userProfileData = await getUserProfile(user);
		// set data
		setUserLocation(userProfileData.location);
		setDisplayName(userProfileData.display_name)
		// map through interests to set the current interests
		setUserInterests(userProfileData.interests.map(cat => cat.category));
		setImagePreview(userProfileData.profileImage || '');
	};

	// upon form submit call utility function to set new user data
	const updateUserProfile = async () => {
		const responseStatus = await putUserProfile(user, userInterests, displayName, userLocation, profileImage);
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
								Enter your area:
								<br />
								<AddressAutofill accessToken="pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg">
									<input
										name="city"
										placeholder="city"
										autoComplete="address-level2"
										value={userLocation && userLocation}
										type="text"
										size={40}
										onChange={(e) => setUserLocation(e.target.value)}
									/>
								</AddressAutofill>
							</Form.Label>
						</Form.Group>
						<Form.Group className="mb-3" controlId="display_name">
							<Form.Label>
								Display Name:
								<input
									type="text"
									size={40}
									value={displayName && displayName}
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
									value={userInterests && userInterests}
									onChange={(e) => {
										const options = [...e.target.selectedOptions];
										const values = options.map((option) => option.value);
										setUserInterests(values);
									}}>
									{interestCategories &&
										interestCategories.map((category) => (
											<option key={category.id} value={category.category}>
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
                            {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', marginTop: '10px' }} />}
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
