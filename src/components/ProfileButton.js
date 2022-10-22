import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "../styles/Buttons.module.css";

const ProfileButton = (props) => {
  const { profile_id, src, username, small } = props;

  const navigate = useNavigate();

  return (
    <Form.Group>
      <Button
        id={`profile-${profile_id}`}
        className={`rounded-circle p-0 border-0 ${
          small ? styles.ProfileSmall : styles.Profile
        }`}
        onClick={() => navigate(`/profiles/${profile_id}`)}>
        <Avatar src={src} />
      </Button>
      <Form.Label
        htmlFor={`profile-${profile_id}`}
        className={`btn btn-outline-primary mb-0 ${
          small ? "ms-1" : "d-block my-1"
        }`}>
        {username}
      </Form.Label>
    </Form.Group>
  );
};

export default ProfileButton;
