import React from "react";

const IconText = ({ text, icon, left, right }) => {
  return (
    <>
      {/* Conditionally inserts icons and text based on props. */}
      {left && <i className={`fa-solid fa-${icon}`} />}
      {left && " "}
      {text}
      {right && " "}
      {right && <i className={`fa-solid fa-${icon}`} />}
    </>
  );
};

export default IconText;
