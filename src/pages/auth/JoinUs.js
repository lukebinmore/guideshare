import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import logoEmblem from "../../assets/logo-emblem.png";

const JoinUs = ({ expired }) => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();

  return (
    <>
      <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
        <Modal.Header closeButton>
          {expired && <Modal.Title>Session Expired</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
          {!expired && <h1>Join Us!</h1>}
          {expired && (
            <p>
              Your session has expired, please login again or sign up for an
              account.
            </p>
          )}
          <img src={logoEmblem} alt="Logo Emblem" className="w-100" />
        </Modal.Body>
        <Modal.Body>
          <p>
            A wonderful world of creativity and community is within your reach!
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setAuthModal({ show: true, page: "login" })}
            className="w-75"
            size="lg">
            <i class="fa-solid fa-right-to-bracket" /> Login
          </Button>
          <Button
            variant="primary"
            onClick={() => setAuthModal({ show: true, page: "signup" })}
            className="w-75"
            size="lg">
            <i class="fa-solid fa-user-plus" /> Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JoinUs;
