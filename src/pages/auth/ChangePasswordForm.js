import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import { collectFormData } from "../../utils/utils";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { AuthButton } from "../../components/Buttons";

const ChangePasswordForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

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
            <FormInput
              placeholder="Old Password"
              type="password"
              name="old_password"
              errorData={errors?.old_password}
              text="*Enter your current password."
              hr
            />

            <FormInput
              placeholder="New Password"
              type="password"
              name="new_password1"
              errorData={errors?.new_password1}
              text="*Enter a new password ."
              hr
            />

            <ul>
              <li>Password must:</li>
              <li className="text-muted">Contain at least 8 characters</li>
              <li className="text-muted">Not be a common password</li>
            </ul>

            <hr />

            <FormInput
              placeholder="Confirm New Password"
              type="password"
              name="new_password2"
              errorData={errors?.new_password2}
              text="*Enter your new password again."
            />

            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-75" size="lg">
              <IconText text="Change Password" icon="check" left right />
            </Button>
            <p className="text-muted">Changed your mind?</p>
            <AuthButton page="cancel" size="sm" left variant="secondary" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
