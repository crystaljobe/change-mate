import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getEventIcon } from "../utilities/DefaultIconsUtilities";

function EventCard({ id, title, image, description }) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const fetchIcon = async () => {
            const icon = await getEventIcon();
            setIcon(icon);
        };

        fetchIcon();
    }, []);

    return (
        <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src={image ? image : icon} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="info" as={Link} to={`/event/${id}`}>More Details</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
