import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getNounIcon } from "../utilities/DefaultIconsUtilities";

function EventCard({ id, title, event_photo, description }) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const fetchIcon = async () => {
            const icon = await getNounIcon(5130800);
            setIcon(icon);
        };

        fetchIcon();
    }, []);

    return (
        <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src={event_photo ? event_photo : icon} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="info" as={Link} to={`/event/${id}`}>More Details</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
