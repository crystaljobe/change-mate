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
    if (searchDateStart && searchDateStart.length > 0 && searchDateEnd && searchDateEnd.length > 0) {
        console.log('search date range')
        const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}`);
        let eventDetails = response.data;
        return eventDetails;
    } else {
        console.log('search exact date')
        const response = await api.get(`events/?start_date=${searchDateStart}`);
        let eventDetails = response.data;
        return eventDetails;
    }
};

export const getEventDetailsByLocation = async (searchTerm) => {
    const response = await api.get(`events/?location=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const postEventDetails = async (title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink, location, eventCoordinates) => {
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
        "location": location,
        "Coordinates": eventCoordinates,
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

//wrapped in a try catch and additional console.logs for better error handling
export const updateEventDetails = async (eventID, title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink, location, eventCoordinates) => {
    try {
        let response = await api.put(`events/${eventID}/`, {
            "title": title,
            "event_start": eventStart,
            "event_end": eventEnd,
            "time_zone": timeZone,
            "event_type": eventType,
            "event_venue": eventVenue,
            "event_venue_address": eventVenueAddress,
            "description": description,
            "category": category,
            "event_photo": eventPhoto,
            "virtual_event_link": virtualEventLink || null,  //to satisfy backend requirements 
            "location": location,
            "Coordinates": eventCoordinates || "" //to satisfy backend requirements 
        });
        console.log(response.status);
        if (response.status === 200) {
            return true;
        } else {
            console.log("Error Status:", response.status);
            console.log("Error Data:", response.data);
            return false;
        }
    } catch (error) {
        console.error("Exception when updating event details:", error);
        return false;
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


export const getiCalEventDetails = async (eventID) => {
  const response = await api.get(`events/${eventID}/iCal/`);
  let eventDetails = response.data;
  return eventDetails;
};