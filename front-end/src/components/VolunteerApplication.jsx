import { useEffect, useState } from "react";
import { volunteerRoles } from "../utilities/EventUtilities";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import EventDetails from "../pages/EventDetails";
import { resolvePath } from "react-router-dom";

//name, email, phone, best time to contact, have you volunteered with this organization/person before, why would you like to volunteer for this event, what skills/experience do you have? which role are you interested in?

function VolunteerApplication({ show, handleClose, eventID }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [repeatVolunteer, setRepeatVolunteer] = useState("no");
  const [whyWantToVol, setWhyWantToVol] = useState("");
  const [skillsDescript, setSkillsDescript] = useState("");
  const [rolesSelected, setRolesSelected] = useState([]);

  const [roles, setRoles] = useState([]);

  //setting roles array by making api call for specific event
  const getVolunteerRoles = async () => {
    let rolesArr = await volunteerRoles(eventID); //{id, assigned_volunteers, role, num_volunteers_needed, event}
    setRoles(rolesArr);
  };

  useEffect(() => {
    getVolunteerRoles();
  }, [eventID]);

  //TODO - incorporate actual application API call & uncomment submit code
  const handleSubmit =  () => {
    handleClose();
    // try{
    //   await postApplication(
    //     name,
    //     email,
    //     phoneNum,
    //     contactTime,
    //     repeatVolunteer,
    //     whyWantToVol,
    //     skillsDescript,
    //    rolesSelected
    //   );
    // alert("Your application has been submitted!");
    // window.location.reload();
    // } catch (error) {
    //   console.log('Failed application submission', error);
    // }
  };

  //handles checkbox selecting/deselecting, updates rolesSelected state accordingly
  function handleClickRole(roleName) {
    //selects roleInstance that matches roleName provided to funct
    const roleInstance = roles.find((r) => r.role === roleName);
    //if roleName is in rolesSelected arr already, will remove it else adds it to rolesSelected arr
    const updatedRolesSelected = rolesSelected.some((r) => r.role === roleName)
      ? rolesSelected.filter((r) => r.role !== roleName)
      : [...rolesSelected, roleInstance];
    setRolesSelected(updatedRolesSelected);
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
                value={email}
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
                onClick={(e) => setRepeatVolunteer("yes")}
              />
              <Form.Check
                inline
                label="no"
                type="radio"
                onClick={(e) => setRepeatVolunteer("no")}
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
                          handleClickRole(aRole.role);
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
