import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AddressAutofill } from '@mapbox/search-js-react';

export default function EditUserProfile() {
	const { userProfileData, setUserProfileData } = useOutletContext();
	const [interestCategories, setInterestCategories] = useState([]);
	const [userInterests, setUserInterests] = useState([]);
	const [displayName, setDisplayName] = useState([]);
    const [userLocation, setUserLocation] = useState([])
	const navigate = useNavigate();

	const getInterestCategories = async () => {
		const response = await api.get("interests/");
		setInterestCategories(response.data);
	};

	function handleSubmit(e) {
		e.preventDefault();
		console.log(
			"interests",
			userInterests,
			"display_name",
			displayName,
			"location",
			userLocation
		);
		updateUserProfile();
	}

	const updateUserProfile = async () => {
		let response = await api.put("userprofile/edit_profile/", {
			interests: userInterests,
			display_name: displayName,
			location: userLocation,
		});
		console.log(response);
		if (response.status === 200) {
			navigate("/profile");
		} else {
			console.log("error:", response.data);
		}
	};

	useEffect(() => {
		getInterestCategories();
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
										value={userProfileData.location}
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
									value={userProfileData.display_name}
									onChange={(e) => setDisplayName(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="interests">
							<Form.Label>
								Select your areas of interest:
								<select
									multiple={true}
									size={6}
									value={userProfileData.interests}
									onChange={(e) => {
										const options = [...e.target.selectedOptions];
										const values = options.map((option) => option.value);
										setUserInterests(values);
									}}>
									{interestCategories &&
										interestCategories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.category}
											</option>
										))}
								</select>
							</Form.Label>
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
