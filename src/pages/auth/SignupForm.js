import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useSetCurrentUser } from "../../contexts/currentUserContext";
import { collectFormData } from "../../utils/utils";

const SignupForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

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
            <FormInput
              placeholder="Username"
              name="username"
              errorData={errors?.username}
              text="*Enter your desired username."
              hr
            />

            <FormInput
              placeholder="Password"
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
              placeholder="Confirm Password"
              type="password"
              name="password2"
              errorData={errors?.password2}
              text="*Enter your password again."
            />

            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <IconText text="Sign Up" icon="user-plus" left />
            </Button>
            <p className="text-muted">Already have an account?</p>
            <Button
              variant="secondary"
              onClick={() => setAuthModal({ show: true, page: "login" })}
              size="sm">
              <IconText text="Login" icon="right-to-bracket" left />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignupForm;
