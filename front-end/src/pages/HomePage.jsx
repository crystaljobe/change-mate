import HomepageImg from "/Users/crystaljobe/code_platoon/personal_project/change-mate/front-end/src/assets/Homepage image.jpg";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import setBodyColor from "../components/PageColor";

export default function Homepage() {
    const styles = {
        card: {
            background:'#DF355F', 
            margin: '2',
        }
    }
	return (
        <>
        <Container >
            <Row className="justify-content-md-center" >
                <Col className="d-flex" >
                <Card className="text-center" style={styles.card} >
                    <Card.Body>
                        <br></br>
                        <Card.Title as="h1" style={{color: '#40DFB8'}}>Join our vibrant platform to effortlessly organize impactful events, collaborate for social change, and secure donations—</Card.Title>
                        <Card.Title as="h1" style={{color:'#FDF6EE'}}>all in one place!</Card.Title>
                        <br></br>
                        <Card.Text style={{fontStyle:'italic'}} as="h3">Sign up to make impactful connections today!</Card.Text>
                        <br></br>
                        <Button variant="light" size="lg" as={Link} to="/signup" style={{marginRight:'10px'}}>
                            Sign Up
                        </Button>
                        <Button variant="light" size="lg" as={Link} to="/login" style={{marginLeft:'10px', padding:'30'}}>
                           Login
                        </Button>
                    </Card.Body>
                </Card>
                </Col>
                
                <Col className="text-center" style={styles.main}>
                <Card className="flex-fill">
                    <Card.Img variant="top" src={HomepageImg} alt="telephone pole with post-it note with the words You are Important written" />
                </Card>
                </Col>
            </Row>
        </Container>
        </>
	);
}

