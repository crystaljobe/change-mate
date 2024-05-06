import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LlamaImg from "/src/assets/llama-homepage.png";
import homeBanner from "/src/assets/home-banner.png";

export default function FAQ() {
	return (
		<>
			{/* How it works */}
			{/* <Container>
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
			</Container> */}
			<div style={{ height: '2rem'}}></div>
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

