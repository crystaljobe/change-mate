import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LlamaImg from "/src/assets/llama-homepage.png";
import './Homepage.css';

export default function Homepage() {
	return (
		<>
			<Container fluid style={{ marginTop: "8rem" }} >
				<Row>
					<Col md={4} lg={4} sm={12} className="text-end" style={{ paddingTop: "2px"}}>
						<Image
							src={LlamaImg}
							rounded
							style={{ height: "19rem", width: "19rem", marginTop: "8px", filter: "drop-shadow(gray -1rem 2rem 10px)" }}
						/>
					</Col>

					<Col lg={6} md={8} sm={12} className="text-center" style={{ paddingTop: "6px"}}>
						<Row>
							<h1 className="homepage-header-text">
								Join our vibrant platform to effortlessly organize impactful
								events, collaborate for social change, and secure donations{" "} 
								<span style={{ fontStyle:"italic" }}>all in one place!</span>
							</h1>
						</Row>
						<br />
						<Row className="text-center">
							<h4
								className="homepage-subtext">
								Sign up to make impactful connections today!
							</h4>
						</Row>
						{/* <br /> */}
						<Row className="text-center">
							<Col className="mt-2">
								<Button 
									component={Link} 
									to="/signup"
									style={{
										marginRight: "px",
										paddingLeft: "3rem",
										paddingRight: "3rem",
									}}
									size="large"
									variant="outlined"
									sx={{
										borderColor: "primary.dark", // Default border color
										color: "black",
										border: "2px solid",
										fontWeight: "bold",
										"&:hover": {
											backgroundColor: "secondary.dark",
											color: "white",
										},
									}}>
									Sign Up
								</Button>
								<Button
									component={Link} 
									to="/login"
									style={{
										marginLeft: "20px",
										paddingLeft: "3.5rem",
										paddingRight: "3.5rem",
									}}
									size="large"
									variant="outlined"
									sx={{
										borderColor: "primary.dark", // Default border color
										color: "black",
										fontWeight: "bold",
										border: "2px solid",
										"&:hover": {
											backgroundColor: "secondary.dark",
											color: "white",
										},
									}}>
									Login
								</Button>
								
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>

			{/* Scroll Chevrons */}
			<div style={{ height: '20rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '75px'}}>
				<img style={{ height: '75px'}} src="src/assets/scroll-chevrons.png" alt="" />
			</div>

			{/* Why should the user sign up? */}
			<Container>
				<h1 style={{ textAlign: 'center'}}>Support a Variety of Causes</h1>
				<Row>
					<Col>
						<h5>Make a Difference in Your Community</h5>
					</Col>
					<Col>
						<h5>Discover Volunteer Opportunities Near You</h5>
					</Col>
					<Col>
						<h5>Organize Events for a Good Cause</h5>
					</Col>
				</Row>
				<Row>
					<Col>Our app supports a wide range of causes, including environmental causes, women's rights, minority support, and more.</Col>
					<Col>Find meaningful ways to give back to your community through our app's extensive network of volunteering options.</Col>
					<Col>Create and manage events that support your chosen cause, bringing people together to make a positive impact.</Col>
				</Row>
			</Container>
			<div style={{ height: '50px'}}></div>

			{/* FAQ */}
			<Container>
				<h1 style={{ textAlign: 'center'}}>FAQs</h1>
				<h5>How do I create an event?</h5>
				<p>To create an event, simply go to the menu and click on the 'Create Event' option. Fill in the necessary details, such as the event name, date, location, and description. Once you're done, click 'Submit' to create the event.</p>
				<h5>How do I volunteer?</h5>
				<p>Volunteering is a great way to make a difference! Visit the 'Search Events' option on the menu to explore volunteering opportunities. You can filter by location, cause, date or whether it's In-Person or Virtual to find the perfect volunteer opportunity for you. Once you've found an opportunity you're interested in, click 'Count Me In' to get involved.</p>
				<h5>How can I manage my events?</h5>
				<p>Managing your events is simple! Just go to your event and click on the 'Event Admin' button. From there, you can view and edit your events, manage volunteers and collabrorators, and create tasks for your event's to-do list. Make sure to keep your event details up to date to ensure a successful event.</p>
				<h5>How do I sign up?</h5>
				<p>Signing up is quick and easy! Just click on the 'Sign Up' button on the homepage and fill in your details. Once you've completed the registration process, you'll be ready to start using our app and making a difference!</p>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
					<Button 
						component={Link} 
						to="/signup"
						style={{
							marginRight: "px",
							paddingLeft: "3rem",
							paddingRight: "3rem",
						}}
						size="large"
						variant="outlined"
						sx={{
							borderColor: "primary.dark", // Default border color
							color: "black",
							border: "2px solid",
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: "secondary.dark",
								color: "white",
							},
						}}>
						Sign Up
					</Button>
				</div>
			</Container>

		</>
	);
}
