import { api } from "../utilities";

export const getUserProfile = async(user) => {
    const response = await api.get("userprofile/");
    let userProfileData = response.data;
    return userProfileData;
}

export const putUserProfile = async (upload_data) => {

    const filtered_data = Object.fromEntries( Object.entries(upload_data).filter(([key, value]) => value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '') && (!Array.isArray(value) || value.length > 0)) );
    let response = await api.put("userprofile/edit_profile/", filtered_data);
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