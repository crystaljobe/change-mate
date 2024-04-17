import HomepageImg from "/Users/crystaljobe/code_platoon/personal_project/change-mate/front-end/src/assets/Homepage image.jpg";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";

export default function Homepage() {
	return (
        <>
        <br></br>
        <Container>
            <Row className="justify-content-md-center" >
                <Col className="d-flex">
                <Card className="text-center" style={{background:'#DF355F'}} >
                    <Card.Body>
                        <br></br>
                        <Card.Title as="h1" style={{color: '#40DFB8'}}>Join our vibrant platform to effortlessly organize impactful events, collaborate for social change, and secure donations—</Card.Title>
                        <Card.Title as="h1" style={{color:'#FDF6EE'}}>all in one place!</Card.Title>
                        <br></br>
                        <Card.Text as="h3">Sign up to make impactful connections today!</Card.Text>
                        <br></br>
                        <Button variant="light" size="lg" as={Link} to="/signup">
                            Sign Up
                        </Button>
                    </Card.Body>
                </Card>
                </Col>
                
                <Col className="text-center" >
                <Card className="flex-fill">
                    <Card.Img variant="top" src={HomepageImg} alt="telephone pole with post-it note with the words You are Important written" />
                </Card>
                </Col>
            </Row>
        </Container>
        </>
	);
}

