import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";

const ChangePasswordForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });
  const { new_password1, new_password2, old_password } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("auth/password/change/", formData);
      setAuthModal({ show: false });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="old-password">
              <Form.Label className="d-none">Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                name="old_password"
                value={old_password}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.old_password}
                text="*Enter your current password."
              />
            </Form.Group>

            <hr />

            <Form.Group controlId="new-password1">
              <Form.Label className="d-none">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="new_password1"
                value={new_password1}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.new_password1}
                text="*Enter a new password."
              />
            </Form.Group>

            <hr />

            <ul>
              <li>Password must:</li>
              <li className="text-muted">Contain at least 8 characters</li>
              <li className="text-muted">Not be a common password</li>
            </ul>

            <hr />

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                name="new_password2"
                value={new_password2}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.new_password2}
                text="*Enter your new password again."
              />
            </Form.Group>
            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <IconText text="Change Password" icon="check" left right />
            </Button>
            <p className="text-muted">Changed your mind?</p>
            <Button
              variant="secondary"
              onClick={() => setAuthModal({ show: false })}
              size="sm">
              <IconText text="Cancel" icon="ban" left />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
