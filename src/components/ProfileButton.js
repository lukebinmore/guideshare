import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Avatar from "./Avatar";
import FollowProfileButton from "./FollowProfileButton";
import styles from "../styles/Buttons.module.css";

const ProfileButton = (props) => {
  const { profile_id, src, username, horizontal, follow, disabled } = props;
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  return (
    <Form.Group>
      <Form.Label
        htmlFor={`profile-${profile_id}`}
        className={`rounded-circle ${styles.Profile}`}>
        <Avatar src={src} />
      </Form.Label>

      <div
        className={`btn-group-vertical ${
          horizontal ? "d-inline-block ms-2" : "d-block"
        }`}>
        <Button
          id={`profile-${profile_id}`}
          variant="outline-primary"
          onClick={() => navigate(`/profiles/${profile_id}`)}
          disabled={disabled}>
          {username}
        </Button>
        {profile_id !== currentUser?.pk && follow && (
          <FollowProfileButton id={profile_id} />
        )}
      </div>
    </Form.Group>
  );
};

export default ProfileButton;
