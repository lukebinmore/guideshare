import React from "react";
import { Dropdown } from "react-bootstrap";
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
            dropdown
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
