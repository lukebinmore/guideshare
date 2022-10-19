import axios from "axios";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import IconText from "../../components/IconText";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useSetCurrentUser } from "../../contexts/currentUserContext";
import { removeTokenTimestamp } from "../../utils/utils";

const SignoutForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.post("auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      setAuthModal({ show: false });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
          <Button
            onClick={() => setAuthModal({ show: false })}
            className="w-75"
            size="lg">
            <IconText text="No, Take me back" icon="ban" left />
          </Button>
          <Button
            variant="danger"
            onClick={handleSignOut}
            className="w-75"
            size="lg">
            <IconText text="Sign Out" icon="right-from-bracket" left />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignoutForm;
