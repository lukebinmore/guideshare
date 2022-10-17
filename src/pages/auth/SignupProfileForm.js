import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import FormError from "../../components/FormError";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useCurrentUser } from "../../contexts/currentUserContext";

const SignupProfileForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
  });
  const { first_name, last_name, dob } = formData;
  const picture = useRef(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allFormData = new FormData();

    Object.keys(formData).map((key) => {
      return allFormData.append(key, formData[key]);
    });

    if (picture) {
      allFormData.append("picture", picture.current?.files[0]);
    }

    try {
      await axiosReq.put(`profiles/${currentUser.profile_id}`, allFormData);
      setAuthModal({ show: false });
      navigate(0);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Modal
        show={authModal.show}
        onHide={() => setAuthModal({ show: false })}
        backdrop="static"
        keyboard={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Create Your Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Avatar change forwardRef={picture} />
              <FormError
                data={errors?.picture}
                text="(OPTIONAL) Upload a profile picture."
              />
            </Form.Group>

            <hr />

            <Form.Group controlId="first-name">
              <Form.Label className="d-none">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.first_name}
                text="(OPTIONAL) Enter your first name."
              />
            </Form.Group>

            <hr />

            <Form.Group controlId="last-name">
              <Form.Label className="d-none">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.last_name}
                text="(OPTIONAL) Enter your last name."
              />
            </Form.Group>

            <hr />

            <Form.Group controlId="dob">
              <Form.Label className="d-none">Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Date of Birth"
                name="dob"
                value={dob}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.dob}
                text="(OPTIONAL) Enter your date of birth."
              />
            </Form.Group>
            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <i className="fa-solid fa-floppy-disk" /> Save Profile
            </Button>
            <p>Don't feel like doing this yet?</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setAuthModal({ show: false });
                navigate(0);
              }}>
              <i className="fa-solid fa-clock" /> Do It Later
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignupProfileForm;
