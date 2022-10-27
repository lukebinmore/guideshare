import React from "react";
import { Image, Modal } from "react-bootstrap";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import expired from "../../assets/expired.png";
import { AuthButton } from "../../components";
import { useBreakpoints } from "../../hooks";

const UserExpired = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const { sm } = useBreakpoints();

  return (
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Modal.Header closeButton>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Image src={expired} alt="Logo Emblem" className="w-100" />
      </Modal.Body>
      <Modal.Body>
        <p>
          It looks like your session has expired, please login again or create a
          new account.
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

export default UserExpired;
