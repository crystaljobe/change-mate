import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import defaultImage from '../assets/Default-Event.png';

function EventCard({ ...event }) {
    const [date, setDate] = useState('');
    const [dateRange, setDateRange] = useState('');

    // Function to decide whether the date is a day or a range
    const handleDates = () => {
        const start = event.startDate
        const end = event.endDate

        if (start == end) {
            setDate(start)
        } else {
            setDateRange(`${start} - ${end}`)
        }
    }

    useEffect(() => {
        handleDates()  
	}, []);

    // Renders dates based on if it's a range or a sungle date
    const renderDates = () => {
        if (date && date.length > 0) {
            return <Card.Text style={{ margin: '0px' }}>Date: {date}</Card.Text>
        } else if (dateRange && dateRange.length > 0) {
            return <Card.Text style={{ margin: '0px' }}>Dates: {dateRange}</Card.Text>
        }
    }

    // Renders Venue if In-person or Online if Virtual
    const renderLocation = () => {
        const type = event.event_type
        if (type == 'In-person') {
            return <Card.Text>Location: {event.event_venue}</Card.Text>
        } else if (type == 'Virtual') {
            return <Card.Text>Location: Online</Card.Text>
        }
    }

    return (
        <Card style={{ width: '100%', maxWidth:"400px", minWidth:"150px"}}>
             <Card.Img style={{ height: '250px', wigth: '100%', objectFit: 'cover' }} variant="top" src={event.event_photo ? event.event_photo : defaultImage} />
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                {renderDates()}
                {renderLocation()}
                <Button variant="link" style={{color: '#6840DF'}} as={Link} to={`/event/${event.id}`}>More Details</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
