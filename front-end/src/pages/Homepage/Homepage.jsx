import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LlamaImg from "/src/assets/llama-homepage.png";
import ChevronImg from "/src/assets/scroll-chevrons.png";
import './Homepage.css';
import homeBanner from "/src/assets/home-banner.png";

export default function Homepage() {
	return (
		<>
			<Container style={{ marginTop: "4rem" }} >
				<Row className="d-flex justify-content-center">
					<Col md={3} lg={3} sm={12} className="text-center" style={{ paddingTop: "2px"}}>
						<Image
							src={LlamaImg}
							rounded
							style={{ height: "19rem", width: "19rem", marginTop: "17px", filter: "drop-shadow(gray -1rem 2rem 10px)" }}
						/>
					</Col>

					<Col lg={9} md={9} sm={12} className="text-center mt-4" style={{ paddingTop: "6px"}}>
						<Row className="mt-4">
							<h1 className="homepage-header-text">
							Join our dynamic platform to seamlessly discover and participate in social impact events, 
							organize meaningful initiatives, and collaborate with others to drive social change{" "} 
								<span style={{ fontStyle:"italic" }}>all in one place!</span>
							</h1>
						</Row>
						<Row className="text-center">
							<h4
								className="homepage-subtext">
								Sign up to make impactful connections today!
							</h4>
						</Row>
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
			<div style={{ height: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
				<img style={{ height: '5rem'}} src={ChevronImg} alt="scroll to learn more" />
			</div>
			<div style={{ height: '8rem'}}></div>
			{/* Why should the user sign up? */}
			<Container>
				<h1 style={{ textAlign: 'center'}}>Support a Variety of Causes</h1>
				<Row style={{ textAlign: 'center', marginTop:"3rem"}}>
					<Col>
						<h4>Make a Difference in Your Community</h4>
					</Col>
					<Col>
						<h4>Discover Volunteer Opportunities Near You</h4>
					</Col>
					<Col>
						<h4>Organize Events for a Good Cause</h4>
					</Col>
				</Row>
				<Row style={{marginTop:"1rem"}}>
					<Col>Our app supports a wide range of causes, including environmental causes, women's rights, minority support, and more.</Col>
					<Col>Find meaningful ways to give back to your community through our app's extensive network of volunteering options.</Col>
					<Col>Create and manage events that support your chosen cause, bringing people together to make a positive impact.</Col>
				</Row>
			</Container>
			<div style={{ height: '8rem'}}></div>

			<Container style={{backgroundColor:"#6840DF", borderRadius:"10px", padding:"1rem", paddingTop:"3rem", paddingBottom:"3rem", boxShadow:"0 2px 4px rgba(0,0,0,0.5)"}}>
				<h1 style={{ textAlign: 'center', color:"white"}}>Join us and make a difference</h1>
				<p style={{ textAlign: 'center', color:"white"}}>Sign up now and start contributing to the causes that you care about</p>
				<div style={{ display: 'flex', justifyContent: 'center',marginBottom: '1rem', marginTop: '2rem'}}>
					<Button 
						component={Link} 
						to="/signup"
						style={{
							paddingLeft: "3rem",
							paddingRight: "3rem",
						}}
						size="large"
						variant="outlined"
						sx={{
							borderColor: "primary.light", 
							color: "white",
							border: "2px solid",
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: "secondary.dark",
								color: "white",
							},
						}}>
						Sign Up Here!
					</Button>
					</div>
			</Container>
			<div style={{ height: '8rem'}}></div>

			{/* How it works */}
			<Container>
				<h1 style={{ textAlign: 'center'}}>How It Works</h1>
				<Row style={{ textAlign: 'center', marginTop:"2rem"}}>
					<Col>
						<h4>Sign Up</h4>
						<p style={{ marginTop:"1rem"}}>Register for an account to access our platform and start making a difference.</p>
						<Button className="d-flex justify-self-center" component={Link} 
						to="/signup" sx={{color:"#6840DF", fontSize:"1rem"}}>Sign Up Here!</Button>
					</Col>
					<Col>
						<h4>Find Events</h4>
						<p style={{ marginTop:"1rem"}}>Search for events based on your interests, location, and availability.</p>
						<Button className="d-flex justify-self-center" component={Link} 
						to="/events" sx={{color:"#6840DF", fontSize:"1rem"}}>Look for Events!</Button>
					</Col>
					<Col>
						<h4>Get Involved</h4>
						<p style={{ marginTop:"1rem"}}>Sign up to volunteer or collaborate on events that inspire you.</p>
						<Button className="d-flex justify-self-center" component={Link} 
						to="/signup" sx={{color:"#6840DF", fontSize:"1rem"}}>Get Started!</Button>
					</Col>
					</Row>
			</Container>
			<div style={{ height: '8rem'}}></div>
			<Container>
			<Image className="d-flex jusify-self-center" src={homeBanner} alt="Your impact matters" style={{borderRadius:"10px", boxShadow:"0 2px 4px rgba(0,0,0,0.5)"}} />
			</Container>
			<div style={{ height: '7rem'}}></div>

			{/* FAQ */}
			<Container>
				<h1 style={{ textAlign: 'center'}}>FAQs</h1>
				<h4 >How do I create an event?</h4>
				<p style={{ marginTop:"1rem"}}>To create an event, simply go to the menu and click on the 'Create Event' option. Fill in the necessary details, such as the event name, date, location, and description. Once you're done, click 'Submit' to create the event.</p>
				<h4>How do I volunteer?</h4>
				<p style={{ marginTop:"1rem"}}>Volunteering is a great way to make a difference! Visit the 'Search Events' option on the menu to explore volunteering opportunities. You can filter by location, cause, date or whether it's In-Person or Virtual to find the perfect volunteer opportunity for you. Once you've found an opportunity you're interested in, click 'Count Me In' to get involved.</p>
				<h4>How can I manage my events?</h4>
				<p style={{ marginTop:"1rem"}}>Managing your events is simple! Just go to your event and click on the 'Event Admin' button. From there, you can view and edit your events, manage volunteers and collabrorators, and create tasks for your event's to-do list. Make sure to keep your event details up to date to ensure a successful event.</p>
				<h4>How do I sign up?</h4>
				<p style={{ marginTop:"1rem"}}>Signing up is quick and easy! Just click on the 'Sign Up' button on the homepage and fill in your details. Once you've completed the registration process, you'll be ready to start using our app and making a difference!</p>
				<div style={{ height: '5rem'}}></div>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '7rem'}}>
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
							fontSize: "1.25rem",
							borderColor: "primary.dark", // Default border color
							color: "black",
							border: "2px solid",
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: "secondary.dark",
								color: "white",
							},
						}}>
						Make a Difference Today!
					</Button>
				</div>
			</Container>

		</>
	);
}
