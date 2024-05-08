import { useEffect, useState } from "react";
import { postVolunteerApplication } from "../utilities/EventUtilities";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import EventDetails from "../pages/EventDetails";
import { resolvePath, useOutletContext } from "react-router-dom";

//name, email, phone, best time to contact, have you volunteered with this organization/person before, why would you like to volunteer for this event, what skills/experience do you have? which role are you interested in?

function VolunteerApplication({ show, handleClose, eventDetails }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [repeatVolunteer, setRepeatVolunteer] = useState("no");
  const [whyWantToVol, setWhyWantToVol] = useState("");
  const [skillsDescript, setSkillsDescript] = useState("");
  const [rolesSelected, setRolesSelected] = useState([]);

  const [roles, setRoles] = useState([]);
  const { user, userProfileData } = useOutletContext();
  console.log('userProfileData', userProfileData.id)

  // setting roles array by making api call for specific event
  const getVolunteerRoles = async () => {
    setRoles(eventDetails.volunteer_roles);
  };

  useEffect(() => {
    setEmail(user.user);
  }, [user])


  useEffect(() => {
    getVolunteerRoles();
  }, [eventDetails]);


  //handles toggling of return volunteer radio buttons to ensure only one is clicked at a time
  function handleReturnVolunteer () {
     if (repeatVolunteer === "no") {
       setRepeatVolunteer("yes");
     } else {
       setRepeatVolunteer("no");
     }
  }


  // Handles submitting the application
  const handleSubmit = async () => {
    // Loops through roles and submits an application for each role
    try{
      for (const role of rolesSelected) {
        const applicationData = {
          'email': email,
          'phone_number': phoneNum,
          'availability': contactTime,
          'return_volunteer': repeatVolunteer,
          'volunteer_interest': whyWantToVol,
          'volunteer_experience': skillsDescript,
          'volunteer_role': role
        }
    
        await postVolunteerApplication(role, applicationData)
      }
      
      alert("Your application has been submitted!");
      window.location.reload();
    } catch (error) {
      console.log('Failed application submission', error);
    }
  };

  //handles checkbox selecting/deselecting, updates rolesSelected state accordingly
  function handleClickRole(roleID) {
    // console.log('VOLUNTEER', rolesSelected)
    // Check if role ID is already in the rolesSelected array
    if (rolesSelected.includes(roleID)) {
      // If it is, remove it by filtering out the ID from rolesSelected
      setRolesSelected(rolesSelected.filter((id) => id !== roleID));
    } else {
      // If it's not, add the role ID to the rolesSelected array
      setRolesSelected([...rolesSelected, roleID]);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Volunteer Application</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ overflowY: "scroll", maxHeight: "70vh" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="123@email.com"
                autoFocus
                value={email ? email : email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="111-222-3333"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Best time to contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="'evenings', '8-10 AM', etc."
                value={contactTime}
                onChange={(e) => setContactTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Have you previously volunteered with this organization/person?{" "}
              </Form.Label>
              <Form.Check
                inline
                label="yes"
                type="radio"
                checked={repeatVolunteer === "yes"}
                onClick={handleReturnVolunteer}
              />
              <Form.Check
                inline
                label="no"
                type="radio"
                onClick={handleReturnVolunteer}
                checked={repeatVolunteer === "no"}
              />
            </Form.Group>

            {/* if volunteer roles have been provided by the event */}
            {roles.length !== 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Select roles you would be interested in</Form.Label>
                <br />
                {/*map through roles here: */}
                {roles.map((aRole, idx) => {
                  return (
                    <>
                      <Form.Check
                        key={idx}
                        inline
                        label={aRole.role}
                        type="checkbox"
                        onClick={(e) => {
                          handleClickRole(aRole.id);
                        }}
                      />
                    </>
                  );
                })}
              </Form.Group>
            )}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Why would you like to volunteer for this event?{" "}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={whyWantToVol}
                onChange={(e) => setWhyWantToVol(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>What skills or experience do you have? </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={skillsDescript}
                onChange={(e) => setSkillsDescript(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VolunteerApplication;
