import React from "react";
import ButtonText from "./ButtonText";

const AdminButton = ({
  href = "",
  text = "Admin Panel",
  leftIcon,
  rightIcon,
}) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="btn btn-primary"
      href={process.env.REACT_APP_API_URL + href}>
      <ButtonText
        text={text}
        icon="screwdriver-wrench"
        left={leftIcon}
        right={rightIcon}
      />
    </a>
  );
};

export default AdminButton;
