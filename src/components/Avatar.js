import React, { useState } from "react";
import { Fade, Form, Image } from "react-bootstrap";
import profilePlaceholder from "../assets/profile-placeholder.png";
import changePicture from "../assets/change-picture.png";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src = profilePlaceholder, forwardRef, change }) => {
  const [showChange, setShowChange] = useState(false);

  const [picture, setPicture] = useState(src);

  const handlePictureChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(picture);
      setPicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={styles.Container}>
      <Image
        src={picture}
        alt="Profile Picture"
        roundedCircle
        className={styles.AvatarImage}
      />

      {change && (
        <>
          <Form.Label htmlFor="profile-picture">
            <Fade in={showChange}>
              <Image
                src={changePicture}
                alt="Change Profile Picture"
                roundedCircle
                className={styles.ChangeOverlay}
                onMouseEnter={() => setShowChange(true)}
                onMouseLeave={() => setShowChange(false)}
              />
            </Fade>
          </Form.Label>

          <Form.Control
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="d-none"
            ref={forwardRef}
          />
        </>
      )}
    </div>
  );
};

export default Avatar;
