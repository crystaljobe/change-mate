import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import DefaultProfileImg from "/src/assets/Default-Profile.png";

export default function UserProfileInfoCard({
  image,
  display_name,
  location,
  userIntStr,
  profileIcon,
  badges,
  userEvents,
  eventsAttending,
  volunteerEvents
}) {
  return (
    <Card className="text-center shadow-lg" style={{ width: '100%', overflow: 'hidden', borderRadius: '15px' }}>
      <Card.Header style={{ backgroundColor: '#6840DF', color: '#ffffff', fontSize: '1.25rem' }}>Profile Info</Card.Header>
      <Card.Img variant="top" src={image || profileIcon} style={{ height: '350px', objectFit: 'cover' }} alt={`${display_name}'s photo`} />
      <Card.Body style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Row>
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
              {userIntStr || 'Not specified'}
            </Card.Text>
          </Col>
          <Col md={8}  style={{ paddingRight: '500px' }}> 
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF", textAlign: 'right' }}>Badges</Card.Title>
            <div style={{ textAlign: 'right' }}>
              {badges && <>
                <Image src={badges['hostIcon']} rounded style={{ height: '10px', marginRight: '10px', verticalAlign: 'right' }} />
                <div>{userEvents.length} Events Created</div>
                <Image src={badges["commitIcon"]} rounded style={{ height: '10px', marginRight: '10px', verticalAlign: 'right' }} />
                <div>{eventsAttending.length} Events Committed To</div>
                <Image src={badges["volunteerIcon"]} rounded style={{ height: '10px', marginRight: '10px', verticalAlign: 'right' }} />
                <div>{volunteerEvents.length} Events Volunteered For</div>
              </>}
            </div>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
}
