import { api } from "../utilities";

export const getEventDetails = async (eventID) => {
    const response = await api.get(`events/${eventID}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const postEventDetails = async (title, date, time, timeZone, eventType, eventVenue, eventVenueAddress, description, category) => {
    let response = await api.post("events/", {
        "title" : title,
        "date" : date,
        "time" : time,
        "time_zone" : timeZone,
        "event_type" : eventType,
        "event_venue" : eventVenue,
        "event_venue_address" : eventVenueAddress,
        "description" : description,
        "category" : category,
    });
    console.log(response);
    if (response.status === 201) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};


export const setUsersAttending = async (eventID, usersAttending) => {
    let response = await api.put(`events/${eventID}/`, {
        users_attending : usersAttending
    });
    if (response.status === 200) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const updateEventDetails = async (eventID, title, date, time, timeZone, eventType, eventVenue, eventVenueAddress, description, category) => {
    let response = await api.put(`events/${eventID}/`, {
        title: title,
        date: date,
        time: time,
        time_zone: timeZone,
        event_type: eventType,
        event_venue: eventVenue,
        event_venue_address: eventVenueAddress,
        description: description,
        category: category,
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