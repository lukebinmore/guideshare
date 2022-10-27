import React from "react";
import { Image, Modal } from "react-bootstrap";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import logoEmblem from "../../assets/logo-emblem.png";
import { AuthButton } from "../../components";
import { useBreakpoints } from "../../hooks";

const JoinUs = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const { sm } = useBreakpoints();

  return (
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Modal.Header closeButton>
        <Modal.Title>Join Us</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Image src={logoEmblem} alt="Logo Emblem" className="w-100" />
      </Modal.Body>
      <Modal.Body>
        <p>
          A wonderful world of creativity and community is within your reach!
        </p>
      </Modal.Body>

      <Modal.Footer>
        <AuthButton
          page="login"
          size={sm && "lg"}
          left
          right
          className="w-75"
        />
        <AuthButton
          page="signup"
          size={sm && "lg"}
          left
          right
          className="w-75"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default JoinUs;
