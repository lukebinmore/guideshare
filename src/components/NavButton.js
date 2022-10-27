import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { ComponentParent } from "../utils/utils";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";

const NavButton = (props) => {
  const { to, left, right, dropdown, hr, className, noText, size } = props;

  const currentUser = useCurrentUser();

  const locations = {
    home: { location: "/", text: "Home", icon: "house" },
    feed: { location: "/feed", text: "Feed", icon: "rss" },
    saved: { location: "/saved", text: "Saved", icon: "bookmark" },
    wip: { location: "/wip", text: "WIP Posts", icon: "list-check" },
    contactUs: {
      location: "/contact-us",
      text: "Contact Us",
      icon: "envelope-open",
    },
    newPost: { location: "/new-post", text: "New Post", icon: "plus" },
    myProfile: {
      location: "/profiles/" + currentUser?.profile_id,
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
      <ComponentParent
        condition={dropdown}
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
      </ComponentParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export default NavButton;
