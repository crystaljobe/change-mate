import { api } from "../utilities";

export const getUserProfile = async(user) => {
    const response = await api.get("userprofile/");
    let userProfileData = response.data;
    return userProfileData;
}

export const putUserProfile = async (user, userInterests, displayName, userLocation, profileImage) => {

    let response = await api.put("userprofile/edit_profile/", {
        interests: userInterests,
        display_name: displayName,
        location: userLocation,
        image: profileImage
    });
    if (response.status === 200) {
        console.log(response.data)
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