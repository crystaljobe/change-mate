import { Card, Row, Col } from 'react-bootstrap';
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
  badges,
  userEvents,
  eventsAttending,
  volunteerEvents,
  interests
}) {

  console.log(interests)
  return (
    <Card className="text-center shadow-lg" style={{ width: '100%', overflow: 'hidden', borderRadius: '15px' }}>
      <Card.Img variant="top" src={banner} style={{ height: '250px', objectFit: 'fluid', objectPosition: "center top" }} alt={`${display_name}'s photo`} />
      <Card.Body style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Row>
          <Col md={2}>
          <Avatar  alt={display_name} src={image || defaultImage} sx={{ width: 150, height: 150 }} /> 
          </Col>

          <Col md={2} className="mt-3 text-start" style={{ paddingLeft: '20px' }}> 
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF" }}>
              {display_name}
            </Card.Title>
            {/* <Card.Subtitle as='h4' className='mt-4' style={{ fontWeight: '600', color: '#6C757D' }}>
              Location:
            </Card.Subtitle>  */}
            <Card.Text className='mt-1'>
              {location || 'Not specified'}
            </Card.Text>
            </Col>
            <Col md={1}></Col>

            <Col md={3} className='text-center mt-3'>
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF" }}>
              Interests:
            </Card.Title>
            <Card.Text>
              {interests.map((cat) => cat.category).join(", ") || 'Not specified'}
            </Card.Text>
          </Col>

          <Col md={4} className="mt-3" > 
            <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF", textAlign: 'right', paddingRight: '20px' }}>Social Impact</Card.Title>
            <div style={{ textAlign: 'right', paddingRight: '20px' }} >
              {badges && <>
                <div className='mt-2'>{userEvents.length} Events Created{" "}<Diversity1Icon /></div>
                <div>
                {volunteerEvents.length} Events Volunteered For{" "}<VolunteerActivismIcon /></div>
                <div>
                {eventsAttending.length} Events Committed To{" "}<FollowTheSignsIcon /></div>
              </>}
            </div>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
}
