import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";



//name, email, phone, best time to contact, have you volunteered with this organization/person before, why would you like to volunteer for this event, what skills/experience do you have? which role are you interested in?



function VolunteerApplication({show, handleClose}) {
  

  return (
    <>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>Volunteer Application</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{overflowY:'scroll', maxHeight:'70vh'}}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="123@email.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="111-222-3333" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Best time to contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="'evenings', '8-10 AM', etc."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Have you previously volunteered with this organization/person?{" "}
              </Form.Label>
              <Form.Check inline label="yes" type="radio" />
              <Form.Check inline label="no" type="radio" />
            </Form.Group>

            {/* if volunteer roles have been provided by the event */}
            <Form.Group className="mb-3">
              <Form.Label>
                Select roles you would be interested in
              </Form.Label>
              <br/>
              {/* TODO: map through roles here: */}
              <Form.Check inline label={"clean-up"} type="checkbox" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Why would you like to volunteer for this event?{" "}
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>What skills or experience do you have? </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VolunteerApplication;
