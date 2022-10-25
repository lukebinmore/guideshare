import React, { useState } from "react";
import { Fade, Form, Image } from "react-bootstrap";
import profilePlaceholder from "../assets/profile-placeholder.png";
import changePicture from "../assets/change-picture.png";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, change }) => {
  const [showChange, setShowChange] = useState(false);

  return (
    <div className={styles.Container}>
      <Image
        src={src || profilePlaceholder}
        alt="Profile Picture"
        roundedCircle
        className={styles.AvatarImage}
      />

      {change && (
        <>
          <Form.Label>
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
        </>
      )}
    </div>
  );
};

export default Avatar;
