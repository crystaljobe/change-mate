import {Container, Col, Card, Button, Stack} from 'react-bootstrap';
import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from '../utilities'

export default function EventDetails() {
    const nav = useNavigate()
    // const [eventDetails, set]


    // const getEventDetails = async() => {
    //     const response = await api.get("event/");
    //     let data = response.data;
        
    // };


    // return (
    //     <Container>
    //     <h1>Event page to display a single event details</h1>
    //     <Button variant="secondary"  as={Link} to="/eventdirections">Create New Event</Button>
    //     </Container>
    // )
}