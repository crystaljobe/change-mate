import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function MyNavbar() {
    return (
        <Navbar id="myNavbar" bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
            <Link to="/">Homepage</Link> 
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </Container>
      </Navbar>
    )
}