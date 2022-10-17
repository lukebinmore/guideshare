import React from "react";

const ButtonText = ({ text, icon, left, right }) => {
  return (
    <>
      {left && <i className={`fa-solid fa-${icon}`} />}
      {left && " "}
      {text}
      {right && " "}
      {right && <i className={`fa-solid fa-${icon}`} />}
    </>
  );
};

export default ButtonText;
