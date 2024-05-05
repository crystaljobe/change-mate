import {Card, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import DefaultProfileImg from "/src/assets/Default-Profile.png";

export default function UserProfileInfoCard({ image, display_name, location, userIntStr}) {
  
  // Function to render user's profile information using Card component
  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Header>Profile Info</Card.Header>
      {/* Display user photo or a default icon if photo is not available */}
      <Card.Img variant="top" src={image || DefaultProfileImg} style={{ height: '250px' }} alt={`${display_name}'s photo`} />
      <Card.Body>
        <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF", textDecoration: 'underline' }}>
          {display_name}
        </Card.Title>
        <br />
        <Card.Subtitle as='h4' style={{ fontWeight: 'bold' }}>Locations:</Card.Subtitle>
        <Card.Text>
          {location}
        </Card.Text>
        <Card.Subtitle as='h4' style={{ fontWeight: 'bold' }}>Interests:</Card.Subtitle>
        <Card.Text>
          {userIntStr}
        </Card.Text>
        <Button variant="info" as={Link} to={'/editprofile'}>
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );
}