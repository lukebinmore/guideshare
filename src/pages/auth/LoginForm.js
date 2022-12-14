import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData, setTokenTimestamp } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AuthButton from "../../components/AuthButton";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import IconText from "../../components/IconText";
import useBreakpoints from "../../hooks/useBreakpoints";

const LoginForm = () => {
  /* Importing the useAuthModal, useSetAuthModal, useSetCurrentUser,
  useBreakpoints, and useNavigate hooks. */
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  /* Function to handle submission of form data to API. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the form. */
    const formData = collectFormData(event);

    try {
      /* Attempts to submit form data to API. */
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
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormInput
            label="Username"
            name="username"
            errorData={errors?.username}
            text="*Enter your username."
            hr
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            errorData={errors?.password}
            text="*Enter your password."
          />

          <FormError data={errors?.non_field_errors} />
        </Modal.Body>

        <Modal.Footer>
          <Button
            aria-label="Login"
            type="submit"
            className="w-75"
            size={sm && "lg"}>
            <IconText text="login" icon="right-to-bracket" left right />
          </Button>
          <p className="text-muted">Don't have an account?</p>
          <AuthButton page="signup" size="sm" left variant="secondary" />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginForm;
