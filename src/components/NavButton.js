import React from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContext";
import IconText from "./IconText";
import { DropdownParent } from "../utils/utils";

const NavButton = (props) => {
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
      <DropdownParent
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
      </DropdownParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export default NavButton;