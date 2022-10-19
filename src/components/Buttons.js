import React from "react";
import IconText from "./IconText";

export const AdminButton = (props) => {
  const { href = "", text = "Admin Panel", leftIcon, rightIcon } = props;

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="btn btn-primary"
      href={process.env.REACT_APP_API_URL + href}>
      <IconText
        text={text}
        icon="screwdriver-wrench"
        left={leftIcon}
        right={rightIcon}
      />
    </a>
  );
};
