import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import EventForm from '../components/EventForm';
import { postEventDetails, timeZoneAbbreviations } from '../utilities/EventUtilities';
import { getInterestCategories } from '../utilities/InterestCategoriesUtilities';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [interestCategories, setInterestCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [eventType, setEventType] = useState('In-Person');
  const [virtualEventLink, setVirtualEventLink] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventVenueAddress, setEventVenueAddress] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [eventPhoto, setEventPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [location, setlocation] = useState('');
  const [eventCoordinates, setEventCoordinates] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getInterestCategories();
      setInterestCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEventPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postEventDetails(
        title,
        eventStart,
        eventEnd,
        timeZone,
        eventType,
        eventVenue,
        eventVenueAddress,
        description,
        category,
        eventPhoto,
        virtualEventLink,
        location, 
        eventCoordinates
      );
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <Container>
      <EventForm
        title={title}
        eventStart={eventStart}
        eventEnd={eventEnd}
        timeZone={timeZone}
        eventType={eventType}
        eventVenue={eventVenue}
        eventVenueAddress={eventVenueAddress}
        virtualEventLink={virtualEventLink}
        description={description}
        category={category}
        interestCategories={interestCategories}
        photoPreview={photoPreview}
        handleImageChange={handleImageChange}
        onTitleChange={(e) => setTitle(e.target.value)}
        onEventStartChange={(e) => setEventStart(e.target.value)}
        onEventEndChange={(e) => setEventEnd(e.target.value)}
        onTimeZoneChange={(e) => setTimeZone(e.target.value)}
        onEventTypeChange={(e) => setEventType(e.target.value)}
        onEventVenueChange={(e) => setEventVenue(e.target.value)}
        onEventVenueAddressChange={(e) => setEventVenueAddress(e.target.value)}
        onVirtualLinkChange={(e) => setVirtualEventLink(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onCoordinateChange={(e) => setEventCoordinates(e.target.value)}
        onLocation={(e) => setlocation(e.target.value)}
        timeZoneAbbreviations={timeZoneAbbreviations}
        handleSubmit={handleSubmit}
      />
      <Button variant="primary" onClick={handleSubmit}>Create Event</Button>
    </Container>
  );
}
