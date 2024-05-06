import { api } from "../utilities";

export const getEventDetails = async (eventID) => {
  const response = await api.get(`events/${eventID}`);
  let eventDetails = response.data;
  return eventDetails;
};

// Get events by search parameters
export const getEventDetailsSearch = async (allData) => {
  // Construct API call with only the parameters that are not empty, null, or undefined
  const requestData = Object.entries(allData)
    .filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const response = await api.get(`events/?${requestData}`);
  return response.data;
};

export const postEventDetails = async (
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
  eventCoordinates,
  attendeesNeeded
) => {
  let response = await api.post("events/", {
    title: title,
    event_start: eventStart,
    event_end: eventEnd,
    time_zone: timeZone,
    event_type: eventType,
    event_venue: eventVenue,
    event_venue_address: eventVenueAddress,
    description: description,
    category: category,
    event_photo: eventPhoto, // Set up as a base64 for the backend
    virtual_event_link: virtualEventLink || null,
    location: location || null,
    coordinates: eventCoordinates || null,
    attendees_needed: attendeesNeeded,
  });
  if (response.status === 201) {
    return true;
  } else {
    console.log("error:", response.data);
  }
};

export const setUserAttending = async (eventID, rsvp) => {
    let response = await api.put(`events/${eventID}/`, {
      "rsvp": rsvp
    })
        if (response.status === 200) {
            return true;
        } else {
            console.log("error:", response.data, "status:", response.status);
            return false;
        }
}

// wrapped in a try catch and additional console.logs for better error handling
export const updateEventDetails = async (eventID, title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink, location, eventCoordinates, attendeesNeeded) => {
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
            "location": location || null,
            "coordinates": eventCoordinates || null, //to satisfy backend requirements
            "attendees_needed": attendeesNeeded,
        });
        // console.log(response.status);
        if (response.status === 200) {
            return true;
        };
    } catch (error) {
        console.error("Exception when updating event details:", error);
        return false;
    }
};

export const deleteEvent = async (eventID, event) => {
  const response = await api.delete(`events/${eventID}/`, {
    event,
  });
  if (response.status === 204) {
    return true;
  }
};

export const getiCalEventDetails = async (eventID) => {
  const response = await api.get(`events/${eventID}/iCal/`);
  let eventDetails = response.data;
  console.log(eventDetails)
  return eventDetails;
};

// the goal is make this into an API call to call the backend view get_timezone
export const timeZoneAbbreviations = [
  "America/Adak",
  "America/Anchorage",
  "America/Chicago",
  "America/Denver",
  "America/Halifax",
  "America/Los_Angeles",
  "America/New_York",
  "America/Noronha",
  "America/St_Johns",
  "Asia/Bangkok",
  "Asia/Dhaka",
  "Asia/Dubai",
  "Asia/Istanbul",
  "Asia/Kabul",
  "Asia/Karachi",
  "Asia/Kathmandu",
  "Asia/Kolkata",
  "Asia/Tehran",
  "Atlantic/Azores",
  "Europe/Kiev",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Moscow",
  "Europe/Paris",
  "GMT",
  "Pacific/Honolulu",
  "Pacific/Niue",
];



//admin page - event details GET request
export const getAdminEventDetails = async (eventID) => {
  const response = await api.get(`events/admin/${eventID}/`);
  let eventDetails = response.data;
  return eventDetails;
};

//adding/removing hosts from admin page
export const updateHosts = async (eventID, user_id, addremove) => {
  const response = await api.put(`events/${eventID}/`, {
    "hosts": user_id,
    "host_invite": addremove
  });
  console.log("utility funct", user_id, addremove, eventID)
  if (response.status === 200) {
    return true;
  }
  console.log("Cannot add hosts:", response.status);
  return false;
};

export const getEventPosts = async (eventID, postType) => {
  // console.log(eventID)
  const response = await api.get(`events/${eventID}/posts/${postType}/`);
  let eventPosts = response.data;
  return eventPosts;
}

export const postEventPosts = async (eventID, postType, newPostData) => {
  const response = await api.post(`events/${eventID}/posts/${postType}/`, newPostData);
  let eventPosts = response.data;
  console.log("RETURN DATA", eventPosts)
  return eventPosts;
}

export const postPostComment = async (eventID, postId, newCommentData) => {
  const response = await api.post(`events/${eventID}/posts/${postId}/comments/`, newCommentData);
  let postComments = response.data;
  console.log("RETURN DATA", postComments)
  return postComments;
}

export const deletePostComment = async (eventID, replyId) => {
  const response = await api.delete(`events/${eventID}/posts/comment/${replyId}/`);
  console.log(response)
  let postComments = response.data;
  console.log("RETURN DATA", postComments)
  return postComments;
}

export const deleteEventPost = async (eventID, postId) => {
  const response = await api.delete(`events/${eventID}/posts/${postId}/`);
  let postComments = response.data;
  console.log("RETURN DATA", postComments)
  return postComments;
}

export const getEventTasks = async (eventID) => {
  // console.log(eventID)
  const response = await api.get(`todo/${eventID}`);
  let eventTasks = response.data;
  return eventTasks;
}

export const postVolunteerApplication = async (roleID, applicationData) => {
  const response = await api.post(`volunteer_applications/${roleID}/`, applicationData);
  let application = response.data;
  return application;
}