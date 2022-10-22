import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import useBreakpoints from "../../hooks/useBreakpoints";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useSetCurrentUser } from "../../contexts/currentUserContext";
import { collectFormData, setTokenTimestamp } from "../../utils/utils";
import { AuthButton } from "../../components/Buttons";

const LoginForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

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
          <Button type="submit" className="w-75" size={sm && "lg"}>
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
