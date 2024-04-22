import '../App.css'
import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Container, Row, Col, Card, Button, CardGroup} from 'react-bootstrap';
import { getProfileIcon } from '../utilities/DefaultIconsUtilities';
import { getUserProfile } from '../utilities/UserProfileUtilities';


export default function UserProfile( { user } ) {
    // set user profile data, eventsAttending, userEvents, interests, and icon 
    const { userProfileData, setUserProfileData } = useOutletContext();
    const [eventsAttending, setEventsAttending] = useState([]);
    const [userEvents, setUserEvents] = useState([])
    const [userInterests, setUserInterests] = useState([])
    const [icon, setIcon] = useState("")

    // join user interest as a string for display 
    const userIntStr = userInterests.join(', ')

    // get user profile data using utility func
    const getProfile = async() => {
        const userProfileData = await getUserProfile(user);

        // set userProfile, events, events attending
        setUserProfileData(userProfileData);
        setUserEvents(userProfileData.user_events);
        setEventsAttending(userProfileData.events_attending);

        // get user interest by mapping through array and setting just the cat name
        let interestArr = userProfileData.interests;
        let interests = interestArr.map(cat => cat.category);
        setUserInterests(interests);
    };

    // get user icon using ProfileIcon utility
    const getIcon = async() => {
        const icon = await getProfileIcon();
        setIcon(icon);
    }

    // upon page render get user data and icon
    useEffect(() => {
        getProfile();
        getIcon();
    }, [])

    return (
        <Container id="profile page" fluid>
        <Row className="justify-content-md-center">

            <Col className="text-center" style={{marginBlock:'2rem'}}>
               <Card className="text-center" style={{ width: '18rem' }}>

               <Card.Header>Profile Info</Card.Header>

               {/* TODO: import user profile image if no image display icon */}
                <Card.Img variant="top" src={icon} style={{height: '250px'}} alt="user-icon"  /> 

                    <Card.Body>
                        <Card.Title as='h3'style={{fontWeight:'bold', color:"#6840DF", textDecoration: 'underline'}}>
                            {userProfileData.display_name}  
                        </Card.Title>
                        <br/>
                        <Card.Subtitle as='h4' style={{fontWeight:'bold'}}>
                            Locations:
                        </Card.Subtitle>
                        <Card.Text> 
                            {userProfileData.location} 
                        </Card.Text>
                        <Card.Subtitle as='h4' style={{fontWeight:'bold'}}>
                            Interests:
                        </Card.Subtitle>
                        <Card.Text> 
                            {userIntStr} 
                        </Card.Text>
                        <Button variant="info" as={Link} to={'/editprofile'}>
                            Edit Profile
                        </Button>
                    </Card.Body>
                </Card>
            </Col>

            {/* Events user are collaborating on: */}
            <Col sm={6} className="text-center">

                <h1 style={{color:'#6840DF'}} >Your Events</h1 >
                <Row>
                {/* if user events === 0 display txt no events else map through events to display */}
                {userEvents.length === 0 ? 
                    <h3 style={{fontStyle:'italic'}}>
                        Doesn&apos;t look like you have any events you&apos;re collaborating on at this time
                    </h3> : 
                        userEvents.map(events => (
                    <CardGroup key={events.id} className='p-2'>
                        <Card key={events.id} style={{width:'18rem'}}>
                            <Card.Body>
                                <Card.Title>{events.title}</Card.Title>
                                <Card.Text>
                                    Date: {events.date}
                                    <br/>
                                    Time: {events.time}
                                    <br/>
                                    Event Type: {events.event_type}
                                </Card.Text>
                                <Button style={{margin:3}} variant="info" as={Link} to={`/editevent/${events.id}`}>Edit Event Details</Button>
                                <Button style={{margin:3}} variant="info" as={Link} to={`/event/${events.id}`}>View Event Details</Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>))}
                </Row>
                
                <Row>
                    <Button variant="primary"  as={Link} to="/createevent">Create New Event</Button>
                </Row>
                <br/>
                
                {/* Events user is attending, if no events display text no events else map through events for details */}
                <h1 style={{color:'#6840DF'}}>Upcoming Events</h1 >
                <br/>
                <Row>
                {!eventsAttending.length > 0 ? <h3 style={{fontStyle:'italic'}}>Doesn&apos;t look like you&apos;ve RSVP&apos;d to any events yet. </h3> : eventsAttending.map(events => (
                        <CardGroup key={events.id} className='p-2'>
                            <Card key={events.id} style={{width:'18rem'}}>
                                <Card.Body>
                                    <Card.Title>{events.title}</Card.Title>
                                    <Card.Text>
                                        Date: {events.date}
                                        <br/>
                                        Time: {events.time}
                                        <br/>
                                        Event Type: {events.event_type}
                                    </Card.Text>
                                    <Button variant="info" as={Link} to={`/event/${events.id}`}>View Event Details</Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>))}
                </Row>
                <Row>
                    <Button variant="primary"  as={Link} to="/events">I&apos;m ready to make a difference!</Button>
                </Row>
            </Col>
            <Col sm={1}></Col>
        </Row>
        </Container>
    )
}