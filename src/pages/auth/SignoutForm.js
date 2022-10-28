import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AuthButton from "../../components/AuthButton";
import IconText from "../../components/IconText";
import useBreakpoints from "../../hooks/useBreakpoints";

const SignoutForm = () => {
  /* Importing the useAuthModal, useSetAuthModal, useSetCurrentUser,
  useBreakpoints, and useNavigate hooks. */
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();

  /* Function that handles submission of form data to API. */
  const handleSignOut = async () => {
    try {
      /* Attempts to submit form data to API. */
      await axios.post("auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      setAuthModal({ show: false });
      navigate("/");
    } catch (err) {}
  };

  return (
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <h3>Are you sure you wish to sign out?</h3>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <AuthButton
          page="cancel"
          size={sm && "lg"}
          left
          right
          className="w-75"
        />
        <Button
          aria-label="Sign Out"
          variant="danger"
          onClick={handleSignOut}
          className="w-75"
          size={sm && "lg"}>
          <IconText text="Sign Out" icon="right-from-bracket" left right />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignoutForm;
