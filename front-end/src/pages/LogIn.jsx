import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { userLogin } from "../utilities";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useOutletContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await userLogin(email, password);
        setUser(response)
        navigate("/profile")
    }

    return (
        <>
        <Container fluid>
            <Row>
                <Col sm> </Col>
                <Col sm style={{ textAlign: "center" }}>
                    {" "}<h2>Login</h2>{" "}
                </Col>
                <Col sm> </Col>
            </Row>
		</Container>

        <Form onSubmit={handleSubmit}>
            <Container fluid>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2} />
                    <Form.Label column sm={2} style={{ textAlign: "end" }}>
                        Email:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Col>
                    <Col sm={4} />
                </Form.Group>

                <Form.Group
						as={Row}
						className="mb-3"
						controlId="formHorizontalPassword">
						<Col sm={2} />
						<Form.Label column sm={2} style={{ textAlign: "end" }}>
							Password:
						</Form.Label>
						<Col sm={4}>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</Col>
						<Col sm={4} />
					</Form.Group> 

                    <Row>
						<Col sm> </Col>
						<Col sm style={{ textAlign: "center" }}>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Col>
						<Col sm> </Col>
					</Row>

            </Container>
        </Form>
        </>
    )
}