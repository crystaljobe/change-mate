import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Dropdown } from 'react-bootstrap';
import defaultImage from '../assets/Default-Event.png';
import DropDownButton from './dropDownButton';

function EventCard({ eventCategory, applicationStatus, ...event }) {
    const styles = {
		icon: {
			width: "10vw",
            height: "150px",
			display: "block",
            marginTop: "25px",
            marginBottom: "25px",
            marginLeft: "15px",
            marginRight: "5px"
		},
		image: {
			height: '200px', 
            // objectFit: 'cover' 
		},
	};

    const [date, setDate] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); // Initialize navigate using the useNavigate hook

    // Function to decide whether the date is a day or a range
    const handleDates = () => {
        const start = event.startDate;
        const end = event.endDate;

        if (start === end) {
            setDate(start);
        } else {
            setDateRange(`${start} - ${end}`);
        }
    };

    useEffect(() => {
        handleDates();
    }, []); // Consider adding `event.startDate` and `event.endDate` in the dependency array if they can change.

    // Renders dates based on if it's a range or a single date
    const renderDates = () => {
        if (date && date.length > 0) {
            return <Card.Text style={{ margin: '0px' }}>Date: {date}</Card.Text>;
        } else if (dateRange && dateRange.length > 0) {
            return <Card.Text style={{ margin: '0px' }}>Dates: {dateRange}</Card.Text>;
        }
    };

    // Renders Venue if In-person or Online if Virtual
    const renderLocation = () => {
        const type = event.event_type;
        if (type === 'In-person') {
            return <Card.Text>Location: {event.event_venue}</Card.Text>;
        } else if (type === 'Virtual') {
            return <Card.Text>Location: Online</Card.Text>;
        }
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const renderDropdown = () => {
        if (eventCategory === 'userEvents') {
            return (
                <Dropdown.Menu show>
                    <Dropdown.Item onClick={() => navigate(`/admin/${event.id}`)}>Admin Page</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate(`/collab/${event.id}`)}>Collaborator Page</Dropdown.Item>
                </Dropdown.Menu>
            );
        } else if (eventCategory === 'volunteerEvents') {
            return (
                <Dropdown.Menu show>
                    <Dropdown.Item onClick={() => navigate(`/collab/${event.id}`)}>Collaborator Page</Dropdown.Item>
                </Dropdown.Menu>
            );
        }
    };

    // Conditional Styling for image display based on src
	const imageStyle = event.event_photo ? styles.image : styles.icon;
    //style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={event.event_photo || defaultImage} style={imageStyle} />
            <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Card.Title>{event.title}{applicationStatus && ` : ${applicationStatus}`}</Card.Title>
                {renderDates()}
                {renderLocation()}
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <Button variant="link" style={{ color: '#6840DF' }} as={Link} to={`/event/${event.id}`}>
                        More Details
                    </Button>
                    {/* {eventCategory !== 'eventsAttending' && (
                        <button onClick={toggleDropdown} style={{ border: 'none', background: 'none', fontSize: '12px', cursor: 'pointer' }}>
                            ⬤⬤⬤
                        </button>
                    )}
                    {showDropdown && renderDropdown()} */}
                {eventCategory !== 'eventsAttending' && eventCategory !== null ? <DropDownButton eventID={event.id} eventCategory={eventCategory}/> : null}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

export default EventCard;