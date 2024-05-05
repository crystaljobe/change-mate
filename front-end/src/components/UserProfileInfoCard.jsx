import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import DefaultProfileImg from "/src/assets/Default-Profile.png";
import Avatar from '@mui/material/Avatar';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import banner from '../assets/profile_banner.webp';
import defaultImage from '../assets/Default-Profile.png';

export default function UserProfileInfoCard({
  image,
  display_name,
  location,
  userIntStr,
  profileIcon,
  badges,
  userEvents,
  eventsAttending,
  volunteerEvents,
  interests
}) {

  console.log(interests)
  return (
    <Card className="text-center shadow-lg" style={{ width: '100%', overflow: 'hidden', borderRadius: '15px' }}>
      {/* <Card.Header style={{ backgroundColor: '#6840DF', color: '#ffffff', fontSize: '1.25rem' }}>Profile Info</Card.Header> */}
      <Card.Img variant="top" src={banner} style={{ height: '350px', objectFit: 'fluid', objectPosition: "center top" }} alt={`${display_name}'s photo`} />
      <Card.Body style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Row>
          <Col md={2}>
          <Avatar  alt={display_name} src={image || defaultImage} sx={{ width: 200, height: 200 }} /> 
          </Col>
          <Col md={4} style={{ paddingLeft: '20px' }}> 
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF" }}>
              {display_name}
            </Card.Title>
            <Card.Subtitle as='h4' style={{ fontWeight: '600', color: '#6C757D' }}>
              Location:
            </Card.Subtitle>
            <Card.Text>
              {location || 'Not specified'}
            </Card.Text>
            <Card.Subtitle as='h4' style={{ fontWeight: '600', color: '#6C757D' }}>
              Interests:
            </Card.Subtitle>
            <Card.Text>
              {interests.map((cat) => cat.category).join(", ") || 'Not specified'}
            </Card.Text>
          </Col>
          <Col md={6}  style={{ paddingRight: '300px' }}> 
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF", textAlign: 'right' }}>Social Impact</Card.Title>
            <div style={{ textAlign: 'right' }}>
              {badges && <>
                <Diversity1Icon fontSize='large'/>
                <div>{userEvents.length} Events Created</div>
                <VolunteerActivismIcon fontSize='large'/>
                <div>{volunteerEvents.length} Events Volunteered For</div>
                <FollowTheSignsIcon fontSize='large'/>
                <div>{eventsAttending.length} Events Committed To</div>
              </>}
            </div>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
}
