import { api } from "../utilities";

export const getUserProfile = async(user) => {
    const response = await api.get("userprofile/");
    let userProfileData = response.data;
    return userProfileData;
}

export const putUserProfile = async (upload_data) => {
    
    console.log(upload_data)
    const filteredUploadData = Object.fromEntries(
        Object.entries(upload_data).filter(([key, value]) => 
            value !== null && value !== undefined && 
            (typeof value !== 'string' || value.trim() !== '') && 
            (!Array.isArray(value) || value.length > 0)
        )
    );
    console.log(filteredUploadData)
    let response = await api.put("userprofile/edit_profile/", filteredUploadData);
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