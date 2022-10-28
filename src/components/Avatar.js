import React, { useLayoutEffect, useRef, useState } from "react";
import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import profilePlaceholder from "../assets/profile-placeholder.png";
import changePicture from "../assets/change-picture.png";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, change }) => {
  const [showChange, setShowChange] = useState(false);

  const imgRef = useRef(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    setSize(imgRef.current?.offsetWidth);
  }, [imgRef.current?.offsetWidth]);

  return (
    <div className={styles.Container}>
      <Image
        src={src || profilePlaceholder}
        alt="Profile Picture"
        roundedCircle
        className={styles.AvatarImage}
        width={size}
        height={size}
        ref={imgRef}
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
