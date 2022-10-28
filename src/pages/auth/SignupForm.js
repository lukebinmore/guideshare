import React, { useState } from "react";
import axios from "axios";
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

const SignupForm = () => {
  /* Importing the useAuthModal, useSetAuthModal, useSetCurrentUser, and
  useBreakpoints hooks. */
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const { sm } = useBreakpoints();

  const [errors, setErrors] = useState({});

  /* Function that handles submission of form data to API. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the form. */
    const formData = collectFormData(event);

    try {
      /* Attempts to submit form data to API, then if successful, submits
      login API call. */
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
          <Button
            aria-label="Sign Up"
            type="submit"
            className="w-75"
            size={sm && "lg"}>
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
