import { api } from "../utilities";

export const getNounIcon = async(id) => {
    const response = await api.get(`icons/${id}/`);
    let icon = response.data;
    return icon;
}

// Profile Icon
// id = 4091300

// Event Icon
// id = 5130800

// Create Event Icon
// id = 2532350

// Attend Event Icon
// id = 6651904

// Volunteer Icon
// id = 6763364