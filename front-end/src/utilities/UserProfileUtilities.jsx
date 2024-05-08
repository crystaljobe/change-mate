import { api } from "../utilities";

export const getUserProfile = async(user) => {
    const response = await api.get("userprofile/");
    let userProfileData = response.data;
    return userProfileData;
}

export const putUserProfile = async (user, userInterests, displayName, userLocation, profileImage, userLocationCoords) => {

    let response = await api.put("userprofile/edit_profile/", {
        interests: userInterests,
        display_name: displayName,
        location: userLocation,
        image: profileImage,
        coordinates: userLocationCoords
    });
    if (response.status === 200) {
        return response.data;
    } else {
        console.log("error:", response.data);
    }
};

export const getUserDisplayName = async(user) => {
    const response = await api.get("userprofile/display_name/");
    let userDisplayName = response.data;
    return userDisplayName;
}

//search for a user by email
export const getUserByEmail = async(email) => {
  const response = await api.get(`userprofile/search/${email}/`);
  if (response.status === 200) {
    let profileData = response.data;
    return profileData;
  } else {
    console.log("error:", response.data);
    return null
  }
};