import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { userRegistration } from "../utilities";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { setUser } = useOutletContext();
	const navigate = useNavigate();

	const handleSignUp = async(e) => {
		e.preventDefault();
        const userData = await userRegistration(email, password);
		setUser(userData);
		navigate("/userinterests")
    }

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm> </Col>
					<Col sm style={{ textAlign: "center" }}>
						{" "}<h2>Sign Up</h2>{" "}
					</Col>
					<Col sm> </Col>
				</Row>
			</Container>

			<Form onSubmit={handleSignUp}>
				<Container fluid>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
						<Col sm={2} />
						<Form.Label column sm={2} style={{ textAlign: "end" }}>
							Email:
						</Form.Label>
						<Col sm={4}>
							<Form.Control
								type="email"
								placeholder="Email address"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
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
	);
}
