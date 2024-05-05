import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import defaultImage from '../assets/Default-Event.png';

function EventCard({ id, title, event_photo, description }) {




    return (
        <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src={event_photo ? event_photo : defaultImage} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="info" as={Link} to={`/event/${id}`}>More Details</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
