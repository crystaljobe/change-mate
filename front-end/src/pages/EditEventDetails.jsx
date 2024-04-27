import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import EventForm from '../components/EventForm';
import { getEventDetails, updateEventDetails, deleteEvent, timeZoneAbbreviations } from '../utilities/EventUtilities';
import { getInterestCategories } from '../utilities/InterestCategoriesUtilities';

export default function EditEventDetails() {
  // cucial for page to render the specific event 
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [interestCategories, setInterestCategories] = useState([]);
  // title of the event
  const [title, setTitle] = useState('');
  // Event Start: 2024-05-01T08:45:00Z, sample data
  const [eventStart, setEventStart] = useState('');
  // Event End: 2024-05-04T08:45:00Z, sample data
  const [eventEnd, setEventEnd] = useState('');
  // time zone imported from utilities 
  const [timeZone, setTimeZone] = useState('');
  // event type = In-person or Virtual
  const [eventType, setEventType] = useState('In-Person');
  // event virtual link if a virtual event (ex. - user will input their zoom link)
  const [virtualEventLink, setVirtualEventLink] = useState('');
  // event in-person venue ex-"Downtown Park Center"
  const [eventVenue, setEventVenue] = useState('');
  // eventVenueAddress = full address "123 Example St, City, St Zip"
  const [eventVenueAddress, setEventVenueAddress] = useState('');
  // event details text
  const [description, setDescription] = useState('');
  // event category for search functionality (only one cat per event)
  const [category, setCategory] = useState('');
  // the actual photo 
  const [eventPhoto, setEventPhoto] = useState('');
  // to display a photo so the user can see what picture they have
  const [photoPreview, setPhotoPreview] = useState('');
  // eventLocation format = "city, state"
  const [location, setlocation] = useState('');
  // eventCoordinates = "latitude, longitude"
  const [eventCoordinates, setEventCoordinates] = useState('');

  useEffect(() => {
    const fetchEventAndCategories = async () => {
      const eventDetails = await getEventDetails(eventID);
      const categories = await getInterestCategories();
      setInterestCategories(categories);
      setTitle(eventDetails.title);
      setEventStart(formatDateForInput(eventDetails.event_start));
      setEventEnd(formatDateForInput(eventDetails.event_end));
      setTimeZone(eventDetails.time_zone);
      setEventType(eventDetails.event_type);
      setVirtualEventLink(eventDetails.virtualEventLink || '');
      setEventVenue(eventDetails.event_venue);
      setEventVenueAddress(eventDetails.event_venue_address);
      setDescription(eventDetails.description);
      setCategory(eventDetails.category.id);
      setEventPhoto(eventDetails.event_photo);
      setPhotoPreview(eventDetails.event_photo);
      setEventCoordinates(eventDetails.event_coordinates);
      setlocation(eventDetails.location);
    };
    fetchEventAndCategories();
  }, [eventID]);

  const formatDateForInput = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toISOString().slice(0, 16); // Converts to 'YYYY-MM-DDTHH:MM'
  };

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
    const responseStatus = await updateEventDetails(
      eventID,
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
    if (responseStatus) {
      navigate('/profile');
    }
  };

  const handleDelete = async () => {
    const responseStatus = await deleteEvent(eventID);
    if (responseStatus) {
      navigate('/profile');
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
        handleDelete={handleDelete}
      />
    <Button variant="success" onClick={handleSubmit}>Save Changes</Button>
    <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
    </Container>
  );
}
