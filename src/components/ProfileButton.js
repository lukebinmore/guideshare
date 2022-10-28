import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Avatar from "./Avatar";
import FollowProfileButton from "./FollowProfileButton";
import styles from "../styles/Buttons.module.css";

const ProfileButton = (props) => {
  /* Destructuring the props object. */
  const { profile_id, src, username, horizontal, follow, disabled, unique } =
    props;

  /* Using the useNavigate and useCurrentUser hooks. */
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  return (
    <Form.Group>
      {/* Profile image label linked to profile button. */}
      <Form.Label
        htmlFor={`${unique && "u-"}profile-${profile_id}`}
        className={`rounded-circle ${styles.Profile}`}>
        <Avatar src={src} />
      </Form.Label>

      {/* Conditionally styles container depending on horizontal prop. */}
      <div
        className={`btn-group-vertical ${
          horizontal ? "d-inline-block ms-2" : "d-block"
        }`}>
        {/* Profile button for profile id in props. */}
        <Button
          aria-label={`${username}'s Profile`}
          id={`${unique && "u-"}profile-${profile_id}`}
          variant="outline-primary"
          onClick={() => navigate(`/profiles/${profile_id}`)}
          disabled={disabled}>
          {username}
        </Button>
        {/* Conditional display of the follow button if not the current user 
        and the follow prop has been passed. */}
        {profile_id !== currentUser?.pk && follow && (
          <FollowProfileButton id={profile_id} />
        )}
      </div>
    </Form.Group>
  );
};

export default ProfileButton;
