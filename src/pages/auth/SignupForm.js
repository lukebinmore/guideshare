import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IconText, FormError, FormInput, AuthButton } from "../../components";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData, setTokenTimestamp } from "../../utils/utils";
import { useBreakpoints } from "../../hooks";

const SignupForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const { sm } = useBreakpoints();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

    try {
      const { data } = await axios.post("auth/registration/", formData);
      await axios.post("auth/login/", {
        username: formData.get("username"),
        password: formData.get("password1"),
      });
      setTokenTimestamp(data);
      setCurrentUser(data.user);

      setAuthModal({ show: true, page: "profile" });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormInput
            label="Username"
            name="username"
            errorData={errors?.username}
            text="*Enter your desired username."
            hr
          />

          <FormInput
            label="Password"
            type="password"
            name="password1"
            errorData={errors?.password1}
            text="*Enter a password."
            hr
          />

          <ul>
            <li>Password must:</li>
            <li className="text-muted">Contain at least 8 characters</li>
            <li className="text-muted">Not be a common password</li>
          </ul>

          <hr />

          <FormInput
            label="Confirm Password"
            type="password"
            name="password2"
            errorData={errors?.password2}
            text="*Enter your password again."
          />

          <FormError data={errors?.non_field_errors} />
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" className="w-75" size={sm && "lg"}>
            <IconText text="Sign Up" icon="user-plus" left right />
          </Button>
          <p className="text-muted">Already have an account?</p>
          <AuthButton page="login" variant="secondary" size="sm" left />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SignupForm;
