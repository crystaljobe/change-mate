import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/esm/Button";
import Button from "@mui/material/Button";
import LlamaImg from "../assets/llama-homepage.png";

export default function Homepage() {
	return (
		<Container style={{ marginTop: "8rem" }} className="homepage-header-text">
			<Row>
				<Col md={4} lg="true" className="text-end">
					<Image
						src={LlamaImg}
						rounded
						style={{ height: "21.5rem", width: "21.5rem", marginTop: "8px" }}
					/>
				</Col>

				<Col lg={true} className="text-center" style={{ paddingTop: "1.5rem" }}>
					<Row>
						<h1
							style={{
								color: "#F23F8B",
							}}>
							Join our vibrant platform to effortlessly organize impactful
							events, collaborate for social change, and secure donations <br />{" "}
							<span style={{ color: "#000000" }}>all in one place!</span>
						</h1>
					</Row>
					<br />
					<Row className="text-center">
						<h3
							className="homepage-subtext"
							style={{ color: "#ab47bc", fontStyle: "italic" }}>
							Sign up to make impactful connections today!
						</h3>
					</Row>
					{/* <br /> */}
					<Row className="text-center">
						<Col>
							<Button 
                                component={Link} 
                                to="/signup"
                                style={{
									marginRight: "10px",
									paddingLeft: "3rem",
									paddingRight: "3rem",
								}}
                                size="large"
								variant="outlined"
								sx={{
									borderColor: "primary.dark", // Default border color
                                    color: "primary.dark",
                                    border: "2px solid",
                                    fontWeight: "bold",
									"&:hover": {
                                        backgroundColor: "secondary.dark",
                                        color: "primary.light",
									},
								}}>
								Sign Up
							</Button>
                            <Button
                                component={Link} 
                                to="/login"
                                style={{
									marginLeft: "10px",
									paddingLeft: "3.5rem",
									paddingRight: "3.5rem",
								}}
                                size="large"
								variant="outlined"
								sx={{
									borderColor: "primary.dark", // Default border color
                                    color: "primary.dark",
                                    fontWeight: "bold",
                                    border: "2px solid",
									"&:hover": {
                                        backgroundColor: "secondary.dark",
                                        color: "primary.light",
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
