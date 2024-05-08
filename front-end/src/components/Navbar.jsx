import { Link, useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from "react-bootstrap/Nav";
import Image from 'react-bootstrap/Image';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import ChangeMateLogo from '../assets/changemate-logo.svg';
import DefaultUserImg from "/src/assets/Default-Profile.png";
import { userLogout } from "../utilities/UserUtilities";
import  { forwardRef } from "react";


export default function MyNavbar({ user, setUser, userImg, setUserProfileData }) {
	const navigate = useNavigate();
	const handleUserLogout = async () => {
		const loggedOut = await userLogout();
		if (loggedOut) {
			setUser(null);
			setUserProfileData([]);
			navigate("/")
			
		}
	};
	const { eventID } = useParams();
	// custom drop down toggle for user profile image 
	const CustomToggle = forwardRef(({ children, onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			style={{  alignItems: "start"}}
		>
			<img src={userImg || DefaultUserImg} alt="User Profile Image" style={{ width: 40, height: 40, borderRadius: '50%', marginLeft: 8 }} />
			{children}
		</a>
	));

	CustomToggle.displayName = "CustomToggle";
	return (
		<Navbar
			className=".bg-body-secondary"
			// expand="lg"
			sticky="top"
			collapseOnSelect
			>
			<Container fluid> 
			<Navbar.Brand as={Link} to={"/events"} style={{paddingLeft:"6px"}}>
				<img
					src={ChangeMateLogo}
					width="80"
					height="50"
					className="d-inline-block align-top"
					alt="ChangeMate Logo"
				/>
			</Navbar.Brand>
			

				<Nav align="end">
					{/* if user doesn't exist display log in and sign up options */}
					{!user 
					? (<>
						<Nav.Link as={Link} to="/signup">
						Sign Up
						</Nav.Link>
						<Nav.Link as={Link} to="/login">
							Log In
						</Nav.Link>
					</>) 
					: 
						
					(<>
						<Nav.Link eventKey="4" as={Link} to={"/events"} style={{marginTop: "2px"}}>Search</Nav.Link>
						<Nav.Link eventKey="3" as={Link} to={"/createevent"} style={{marginTop: "2px"}}>Create Event</Nav.Link>
						
						<Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
						<Dropdown.Menu align="end">
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/editprofile">Update Profile</NavDropdown.Item>
								<NavDropdown.Item as={Link} to={"/FAQ"}>FAQ</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleUserLogout()}>Log Out</NavDropdown.Item>
								
                        </Dropdown.Menu>
						</Dropdown>

					</>) 
					}
					
				</Nav>
			</Container>
		</Navbar>
	);
}

{/* <Button onClick={() => handleUserLogout()} variant="underline">Log Out</Button>
<Navbar.Toggle aria-controls="responsive-navbar-nav"  />
<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> 
</Navbar.Collapse>*/}
			