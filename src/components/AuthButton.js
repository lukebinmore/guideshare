import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAuthModal } from "../contexts/AuthModalContext";
import { ComponentParent } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";

const AuthButton = (props) => {
  /* Destructuring the props object. */
  const { page, size, variant, left, right, dropdown, hr, className, refresh } =
    props;

  /* Using the useSetAuthModal and useNavigate hooks. */
  const setAuthModal = useSetAuthModal();
  const navigate = useNavigate();

  /* An object with location properties. */
  const locations = {
    joinUs: { page: "joinus", text: "Join Us", icon: "door-open" },
    login: { page: "login", text: "Login", icon: "right-to-bracket" },
    signup: { page: "signup", text: "Sign Up", icon: "user-plus" },
    profile: { page: "profile", text: "Setup Your Profile", icon: "" },
    signout: {
      page: "signout",
      text: "Sign Out",
      icon: "right-from-bracket",
    },
    changePassword: {
      page: "changePassword",
      text: "Change Password",
      icon: "key",
    },
    cancel: { text: "Cancel", icon: "ban" },
    later: { text: "Do It Later", icon: "clock" },
  };

  const target = locations[page || "joinUs"];

  return (
    <>
      {/* Wrapper that wraps the children with
      the wrapper if the condition is true. */}
      <ComponentParent
        condition={dropdown}
        wrapper={(children) => (
          <Dropdown.Item as="div">{children}</Dropdown.Item>
        )}>
        {/* A button that is setting the state of the authModal on click */}
        <Button
          aria-label={target.text}
          variant={variant}
          size={size}
          className={className}
          onClick={() => {
            setAuthModal({ show: !!target.page, page: target.page });
            refresh && navigate(0);
          }}>
          {/* A component that is rendering an icon and text. */}
          <IconText
            text={target.text}
            icon={target.icon}
            left={left}
            right={right}
          />
        </Button>
      </ComponentParent>
      {/* Rendering a hr or a dropdown divider if the hr prop is true. */}
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export default AuthButton;
