import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import ChangeMateLogo from "/Users/crystaljobe/code_platoon/personal_project/change-mate/front-end/src/assets/changemate-logo.svg";
import { userLogout } from "../utilities";

export default function MyNavbar({ user, setUser, displayName }) {
	const handleUserLogout = async () => {
		const loggedOut = await userLogout();
		if (loggedOut) {
			setUser(null);
		}
	};

	return (
		<Navbar
			bg="light"
			data-bs-theme="light"
			className="bg-body-tertiary"
			expand="lg">

			<Navbar.Brand as={Link} to={"/"}>
				<img
					src={ChangeMateLogo}
					width="80"
					height="50"
					className="d-inline-block align-top"
					alt="ChangeMate Logo"
				/>
			</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					{user ? null : (
						<Nav.Link as={Link} to="/signup">
							Sign Up
						</Nav.Link>
					)}

					{!user ? (
						<Nav.Link as={Link} to="/login">
							Log In
						</Nav.Link>
					) : null}

					{user ? (
						<Button onClick={() => handleUserLogout()} variant="outline-danger">
							Log Out
						</Button>
					) : null}
				</Nav>
			</Navbar.Collapse>

            <Nav className="justify-content-end">
			{user ? (
				<Nav.Link as={Link} to="/profile" style={{fontStyle:'italic', color:'#6840DF'}}> Hello, {displayName}!</Nav.Link>
			) : null}

            <NavDropdown title="Menu" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to={"/profile"}>
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/editprofile"}>
                    Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/userinterests"}>
                    Update Interest
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/createevent"}>
                    Create an Event
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/events"}>
                    Search Events
                </NavDropdown.Item>
            </NavDropdown>
            </Nav>
		</Navbar>
	);
}
