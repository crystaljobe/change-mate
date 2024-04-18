import '../App.css'
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from '../utilities'
import {Container, Row, Col, Card, Button, CardGroup} from 'react-bootstrap';


export default function UserProfile({user}) {
    const styles = {
        header: {
            color:'#6840DF',
            textDecoration: 'underline',
        },
    }

    const { userProfileData, setUserProfileData } = useOutletContext();
    const [eventsAttending, setEventsAttending] = useState([]);
    const [userEvents, setUserEvents] = useState([])
    const [userInterests, setUserInterests] = useState([])
    const userIntStr = userInterests.join(', ')

    // console.log(userProfileData)
    // console.log('events:', userEvents)
    // console.log('attending', eventsAttending)

    const getUserProfile = async() => {
        const response = await api.get("userprofile/");
        let data = response.data;
        setUserProfileData(data);
        setUserEvents(data.user_events);
        setEventsAttending(data.events_attending);
        
        let interestArr = response.data.interests;
        let interests = interestArr.map(cat => cat.category);
        setUserInterests(interests);
    };

    useEffect(() => {
        getUserProfile();
    }, [user, userProfileData])

    return (
        <Container id="profile page" fluid>
        <Row className="justify-content-md-center">

            <Col className="text-center">
                <br/>
                <h1 style={styles.header}>Profile Info</h1>
                <br/>
                <Card className="text-center">
                {/* <Card.Img variant="top" src={`/media/${props.user.profile_pic}`} alt="profile pic"  /> */}
                    <Card.Body>
                        <Card.Title as='h3'style={{fontWeight:'bold'}}>{userProfileData.display_name}</Card.Title>
                        <Card.Subtitle as='h4' style={{fontWeight:'bold'}}>Locations:</Card.Subtitle>
                        <Card.Text> {userProfileData.location} </Card.Text>
                        <Card.Subtitle as='h4' style={{fontWeight:'bold'}}>Interests:</Card.Subtitle>
                        <Card.Text> {userIntStr} </Card.Text>
                        <Button variant="info" as={Link} to={'/editprofile'}>Edit Profile</Button>
                    </Card.Body>
                </Card>
            </Col>


            <Col sm={8} className="text-center">
                <br/>
                <h1 style={styles.header} >Your Events</h1 >
                <br/>

                <Row>
                {!userEvents.length > 0 ? <h2 style={{fontStyle:'italic'}}>Doesn&apos;t look like you have any events you&apos;re collaborating on at this time.</h2> : userEvents.map(events => (
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
                    <Button variant="secondary"  as={Link} to="/createevent">Create New Event</Button>
                </Row>
                <br/>
                
                <h1 style={styles.header}>Upcoming Events</h1 >
                <br/>
                <Row>
                {!eventsAttending.length > 0 ? <h2 style={{fontStyle:'italic'}}>Doesn&apos;t look like you&apos;ve RSVP&apos;d to any events yet. </h2> : eventsAttending.map(events => (
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
                    <Button variant="secondary"  as={Link} to="/events">I&apos;m ready to make a difference!</Button>
                </Row>

            </Col>
        </Row>
        </Container>
    )
}