import { api } from "../utilities";

export const getUserProfile = async(user) => {
    const response = await api.get("userprofile/");
    let userProfileData = response.data;
    return userProfileData;
}

export const putUserProfile = async (user, userInterests, displayName, userLocation) => {
    let response = await api.put("userprofile/edit_profile/", {
        interests: userInterests,
        display_name: displayName,
        location: userLocation,
    });
    console.log(response);
    if (response.status === 200) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const getUserDisplayName = async(user) => {
    const response = await api.get("userprofile/display_name/");
    let userDisplayName = response.data;
    return userDisplayName;
}