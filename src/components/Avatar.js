import React, { useState } from "react";
import { Container, Fade, Image } from "react-bootstrap";
import profilePlaceholder from "../assets/profile-placeholder.png";
import changePicture from "../assets/change-picture.png";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src = profilePlaceholder, alt = "Avatar", change }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.Container}>
      <Image
        src={src}
        alt={alt}
        roundedCircle
        className={`w-100 ${styles.AvatarImage}`}
      />
      {change && (
        <Fade in={show}>
          <Image
            src={changePicture}
            alt="Change Profile Picture"
            roundedCircle
            className={`w-100 ${styles.ChangeOverlay}`}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          />
        </Fade>
      )}
    </div>
  );
};

export default Avatar;
