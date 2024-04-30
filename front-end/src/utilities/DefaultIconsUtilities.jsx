import { api } from "../utilities";


export const getProfileIcon = async() => {
    const response = await api.get("userprofile/get_icon/");
    let icon = response.data;
    return icon;
}
// id = 4091300


export const getEventIcon = async() => {
    const response = await api.get("events/event_icon/");
    let eventIcon = response.data;
    return eventIcon;
}
// id = 5130800

// Create Event Icon
// id = 2532350

// Attend Event Icon
// id = 6651904

// Volunteer Icon
// id = 6763364