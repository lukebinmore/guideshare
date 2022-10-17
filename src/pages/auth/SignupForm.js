import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormError from "../../components/FormError";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useSetCurrentUser } from "../../contexts/currentUserContext";

const SignupForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("auth/registration/", formData);
      setCurrentUser(data.user);
      setAuthModal({ show: true, page: "profile" });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                className="text-center"
              />
              <FormError data={errors?.username} text="*Enter your username." />
            </Form.Group>

            <hr />

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                className="text-center"
              />
              <FormError data={errors?.password1} text="*Enter a password." />
            </Form.Group>

            <hr />

            <ul>
              <li>Password must:</li>
              <li className="text-muted">Contain at least 8 characters</li>
              <li className="text-muted">Not be a common password</li>
            </ul>

            <hr />

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
                className="text-center"
              />
              <FormError
                data={errors?.password2}
                text="*Enter your password again."
              />
            </Form.Group>
            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <i className="fa-solid fa-user-plus" /> Sign Up
            </Button>
            <p className="text-muted">Already have an account?</p>
            <Button
              variant="secondary"
              onClick={() => setAuthModal({ show: true, page: "login" })}
              size="sm">
              <i className="fa-solid fa-right-to-bracket" /> Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignupForm;
