import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import ChangeMateLogo from "/Users/crystaljobe/code_platoon/personal_project/change-mate/front-end/src/assets/changemate-logo.svg";
import { userLogout } from '../utilities';

export default function MyNavbar({ user, setUser }) {

    const handleUserLogout = async() => {
        const loggedOut = await userLogout();
        if(loggedOut) {
            setUser(null);
        }
    }

    return (
        <Container fluid>
        <Navbar id="myNavbar" className="bg-body-tertiary" expand="lg" style={{background:'#FDF6EE'}}>
        
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
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                
                { !user ? <Nav.Link as={Link} to="/login">Log In</Nav.Link> : null }

                { user ? <Button onClick={() => handleUserLogout()} variant="outline-danger">Log Out</Button> : null }

            </Nav>
            </Navbar.Collapse>
        
        </Navbar>
        </Container>

    )
}