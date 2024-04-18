import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Map from "../components/Map";
import {Container, Col, Card, Button, Stack} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export default function EventDirections() {

    return (
        <Container>
        <h1>Get Directions to Your Upcoming Event:</h1>
        <div className="App">
         <Map />
        </div>
        </Container>
    )
}