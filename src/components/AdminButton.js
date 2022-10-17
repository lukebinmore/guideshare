import React from "react";

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
      {leftIcon && (
        <>
          <i className="fa-solid fa-screwdriver-wrench" />{" "}
        </>
      )}
      {text}
      {rightIcon && (
        <>
          {" "}
          <i className="fa-solid fa-screwdriver-wrench" />{" "}
        </>
      )}
    </a>
  );
};

export default AdminButton;
