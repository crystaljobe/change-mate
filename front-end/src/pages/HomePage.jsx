import HomepageImg from "/Users/crystaljobe/code_platoon/personal_project/change-mate/front-end/src/assets/Homepage image.jpg";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function Homepage() {
    const styles = {
        main: {
            backgroundColor: '#FDF6EE',
        },
        topDiv: {
            backgroundColor: '#FDF6EE',
            padding: '4rem',
        }
    }
	return (
        <>
        <div className="full-width" style={styles.topDiv}>
        <Container style={styles.main}>
            <Row className="justify-content-md-center" style={styles.main}>
                <Col className="d-flex" style={styles.main}>
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
                
                <Col className="text-center" style={styles.main}>
                <Card className="flex-fill">
                    <Card.Img variant="top" src={HomepageImg} alt="telephone pole with post-it note with the words You are Important written" />
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
        </>
	);
}

