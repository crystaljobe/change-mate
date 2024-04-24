import { api } from "../utilities";

export const getEventDetails = async (eventID) => {
    const response = await api.get(`events/${eventID}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsByCategory = async (searchTerm) => {
    const response = await api.get(`events/?category=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsByType = async (searchTerm) => {
    const response = await api.get(`events/?type=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsByDate = async (searchDateStart, searchDateEnd) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsByLocation = async (searchTerm) => {
    const response = await api.get(`events/?location=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const postEventDetails = async (title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink) => {
    let response = await api.post("events/", {
        "title" : title,
        "event_start" : eventStart,
        "event_end" : eventEnd,
        "time_zone" : timeZone,
        "event_type" : eventType,
        "event_venue" : eventVenue,
        "event_venue_address" : eventVenueAddress,
        "description" : description,
        "category" : category,
        "event_photo" : eventPhoto,  // Set up as a base64 for the backend 
		"virtual_event_link": virtualEventLink,
    });
    if (response.status === 201) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const setUserAttending = async (eventID, usersAttending) => {
    let response = await api.put(`events/${eventID}/`, {
        "users_attending" : usersAttending
    });
    if (response.status === 200) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const updateEventDetails = async (eventID, title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink) => {
    let response = await api.put(`events/${eventID}/`, {
        "title" : title,
        "event_start" : eventStart,
        "event_end" : eventEnd,
        "time_zone" : timeZone,
        "event_type" : eventType,
        "event_venue" : eventVenue,
        "event_venue_address" : eventVenueAddress,
        "description" : description,
        "category" : category,
        "event_photo" : eventPhoto,
		"virtual_event_link": virtualEventLink
    });
    console.log(response.status);
    if (response.status === 200) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const deleteEvent = async (eventID, event) => {
    const response = await api.delete(`events/${eventID}/`, {
        event
    });
    if (response.status === 204) {
        return true;
    }
}