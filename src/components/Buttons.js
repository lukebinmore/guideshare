import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useSetAuthModal } from "../contexts/authModalContext";
import { useCurrentUser } from "../contexts/currentUserContext";
import IconText from "./IconText";

const DropperParent = ({ dropdown, wrapper, children }) =>
  dropdown ? wrapper(children) : children;

export const AdminButton = (props) => {
  const { href = "", text = "Admin Panel", left, right, dropdown, hr } = props;
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser?.is_admin && (
        <>
          <DropperParent
            dropdown={dropdown}
            wrapper={(children) => (
              <Dropdown.Item as="div">{children}</Dropdown.Item>
            )}>
            <a
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              href={process.env.REACT_APP_API_URL + href}>
              <IconText
                text={text}
                icon="screwdriver-wrench"
                left={left}
                right={right}
              />
            </a>
          </DropperParent>
          {hr && !dropdown && <hr />}
          {hr && dropdown && <Dropdown.Divider />}
        </>
      )}
    </>
  );
};

export const NavButton = (props) => {
  const { to, left, right, dropdown, hr, className, noText, size } = props;

  const currentUser = useCurrentUser();

  const locations = {
    home: { location: "/", text: "Home", icon: "house" },
    feed: { location: "/feed", text: "Feed", icon: "rss" },
    saved: { location: "/saved", text: "Saved", icon: "bookmark" },
    contactUs: {
      location: "/contact-us",
      text: "Contact Us",
      icon: "envelope-open",
    },
    newPost: { location: "/new-post", text: "New Post", icon: "plus" },
    myProfile: {
      location: "/profile/" + currentUser?.profile_id,
      text: "My Profile",
      icon: "user",
    },
  };

  const target = locations[to];

  const setActive = (navData) => {
    return navData.isActive ? "btn btn-secondary" : "btn btn-primary";
  };

  return (
    <>
      <DropperParent
        dropdown={dropdown}
        wrapper={(children) => (
          <Dropdown.Item as="div">{children}</Dropdown.Item>
        )}>
        <NavLink
          end
          to={target.location}
          className={(navData) =>
            setActive(navData) + (size ? ` btn-${size} ` : " ") + className
          }>
          <IconText
            text={!noText && target.text}
            icon={target.icon}
            left={left}
            right={right}
          />
        </NavLink>
      </DropperParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export const AuthButton = (props) => {
  const { page, size, variant, left, right, dropdown, hr, className, refresh } =
    props;

  const setAuthModal = useSetAuthModal();
  const navigate = useNavigate();

  const locations = {
    login: { page: "login", text: "Login", icon: "right-to-bracket" },
    signup: { page: "signup", text: "Sign Up", icon: "user-plus" },
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

  const target = locations[page];

  return (
    <>
      <DropperParent
        dropdown={dropdown}
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
      </DropperParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};
