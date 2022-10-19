import React from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
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
  const { to, left, right, dropdown, hr, className } = props;

  const currentUser = useCurrentUser();

  const locations = {
    home: { location: "/", text: "Home", icon: "house" },
    feed: { location: "/feed", text: "Feed", icon: "square-rss" },
    saved: { location: "/saved", text: "Saved", icon: "floppy-disk" },
    contactUs: {
      location: "/contact-us",
      text: "Contact Us",
      icon: "envelope-open",
    },
    newPost: { location: "/new-post", text: "New Post", icon: "square-plus" },
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
          className={(navData) => setActive(navData) + " " + className}>
          <IconText
            text={target.text}
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
