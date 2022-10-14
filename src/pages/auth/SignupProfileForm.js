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

    for (var pair of allFormData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await axiosReq.put(`profiles/${currentUser.profile_id}`, allFormData);
      setAuthModal({ show: false });
      navigate(0);
    } catch (err) {
      console.log(err);
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
            <Avatar change forwardRef={picture} />

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
              {errors.first_name ? (
                <FormError data={errors.first_name} />
              ) : (
                <Form.Text>Enter your first name.</Form.Text>
              )}
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
              {errors.last_name ? (
                <FormError data={errors.last_name} />
              ) : (
                <Form.Text>Enter your last name.</Form.Text>
              )}
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
              {errors.dob ? (
                <FormError data={errors.dob} />
              ) : (
                <Form.Text>Enter your first name.</Form.Text>
              )}
            </Form.Group>
            {errors.non_field_errors && (
              <FormError data={errors.non_field_errors} />
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <i class="fa-solid fa-floppy-disk" /> Save Profile
            </Button>
            <p>Don't feel like doing this yet?</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setAuthModal({ show: false });
                navigate(0);
              }}>
              <i class="fa-solid fa-clock" /> Do It Later
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignupProfileForm;
