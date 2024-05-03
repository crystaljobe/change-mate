import { api } from "../utilities";






//admin give decision on volunteer application
export const putApplicationDecision = async (applicationID, applicationDecision, decisionText) => {
  const response = await api.put(
    `volunteer_applications/decision/${applicationID}/`,
    {
      "application_status": applicationDecision,
      "decision_text": decisionText,
    }
  );
    console.log("putApplicationDecision utilities page", response.data);

  if (response.status === 200) {
    return response.data
  } else {
    console.log("error:", response.data);
  }
};

//get a volunteer application by application_id
export const getVolunteerApplication = async (applicationID) => {
  const response = await api.get(`volunteer_applications/decision/${applicationID}/`);
  let applicationDetails = response.data;
  return applicationDetails;
};

//creating new volunteer roles for specific event
export const createVolunteerRole = async (
  eventID,
  roleName,
  numVolunteersNeeded
) => {
  try {
    let response = await api.post(`events/${eventID}/volunteers/`, {
      role: roleName,
      num_volunteers_needed: numVolunteersNeeded,
    });
    console.log(response.status);
    if (response.status === 201) {
      return true;
    } else {
      console.log("Error Status:", response.status);
      console.log("Error Data:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error when creating new volunteer role", error);
    return false;
  }
};

//delete a volunteer role for specific event
export const deleteVolunteerRole = async (eventID, roleID) => {
  const response = await api.delete(`events/${eventID}/volunteers/${roleID}/`);
  if (response.status === 204) {
    return true;
  } else {return false}
};