import SadLlama from "/src/assets/Sad-Llama.png";
import { Container, Row, Col, Image } from "react-bootstrap";
import SetBodyColor from "../components/PageColor";
import { useEffect } from "react";

export default function ErrorPage() {

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <Row >
        <Col lg={3} md={5} sm={12}>
        <Image src={SadLlama}
            thumbnail
            style={{ height: "30rem", width: "25rem", marginTop: "17px", border:"none" }} />
        </Col>
        <Col className="justify-content-start" style={{paddingTop:"5rem"}}>
        <h1 >Error: This page does not exist.</h1>
        </Col>
        
        </Row>
        </div>
    )
}