import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LlamaImg from "../assets/llama-homepage.png";

export default function Homepage() {
	return (
		<Container fluid style={{ marginTop: "8rem" }} >
			<Row>
				<Col md={4} lg={4} sm={12} className="text-end" style={{ paddingTop: "2px"}}>
					<Image
						src={LlamaImg}
						rounded
						style={{ height: "19rem", width: "19rem", marginTop: "8px", filter: "drop-shadow(gray -1rem 2rem 10px)" }}
					/>
				</Col>

				<Col lg={6} md={8} sm={12} className="text-center" style={{ paddingTop: "6px"}}>
					<Row>
						<h1 className="homepage-header-text">
							Join our vibrant platform to effortlessly organize impactful
							events, collaborate for social change, and secure donations{" "} 
							<span style={{ fontStyle:"italic" }}>all in one place!</span>
						</h1>
					</Row>
					<br />
					<Row className="text-center">
						<h4
							className="homepage-subtext">
							Sign up to make impactful connections today!
						</h4>
					</Row>
					{/* <br /> */}
					<Row className="text-center">
						<Col className="mt-2">
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
									borderColor: "primary.dark", // Default border color
                                    color: "black",
                                    border: "2px solid",
                                    fontWeight: "bold",
									"&:hover": {
                                        backgroundColor: "secondary.dark",
                                        color: "white",
									},
								}}>
								Sign Up
							</Button>
                            <Button
                                component={Link} 
                                to="/login"
                                style={{
									marginLeft: "20px",
									paddingLeft: "3.5rem",
									paddingRight: "3.5rem",
								}}
                                size="large"
								variant="outlined"
								sx={{
									borderColor: "primary.dark", // Default border color
                                    color: "black",
                                    fontWeight: "bold",
                                    border: "2px solid",
									"&:hover": {
                                        backgroundColor: "secondary.dark",
                                        color: "white",
									},
								}}>
								Login
							</Button>
							
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
