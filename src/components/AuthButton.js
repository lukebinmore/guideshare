import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAuthModal } from "../contexts/AuthModalContext";
import { ComponentParent } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";

const AuthButton = (props) => {
  const { page, size, variant, left, right, dropdown, hr, className, refresh } =
    props;

  const setAuthModal = useSetAuthModal();
  const navigate = useNavigate();

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
      <ComponentParent
        condition={dropdown}
        wrapper={(children) => (
          <Dropdown.Item as="div">{children}</Dropdown.Item>
        )}>
        <Button
          variant={variant}
          size={size}
          className={className}
          onClick={() => {
            setAuthModal({ show: !!target.page, page: target.page });
            refresh && navigate(0);
          }}>
          <IconText
            text={target.text}
            icon={target.icon}
            left={left}
            right={right}
          />
        </Button>
      </ComponentParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export default AuthButton;
