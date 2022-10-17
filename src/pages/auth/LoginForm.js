import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import ButtonText from "../../components/ButtonText";
import FormError from "../../components/FormError";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useSetCurrentUser } from "../../contexts/currentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

const LoginForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("auth/login/", formData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      setAuthModal({ show: false });
      navigate(0);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                className="text-center"
              />
              <FormError data={errors?.password} text="Enter your password." />
            </Form.Group>
            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <ButtonText text="login" icon="right-to-bracket" left />
            </Button>
            <p className="text-muted">Don't have an account?</p>
            <Button
              variant="secondary"
              onClick={() => setAuthModal({ show: true, page: "signup" })}
              size="sm">
              <ButtonText text="Sign Up" icon="user-plus" left />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
