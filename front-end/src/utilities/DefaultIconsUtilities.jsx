import { api } from "../utilities";


export const getProfileIcon = async() => {
    const response = await api.get("userprofile/get_icon/");
    let icon = response.data;
    return icon;
}


export const getEventIcon = async() => {
    const response = await api.get("events/event_icon/");
    let eventIcon = response.data;
    return eventIcon;
}