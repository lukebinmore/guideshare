import React from "react";
import { Dropdown } from "react-bootstrap";
import { useCurrentUser } from "../contexts/currentUserContext";
import IconText from "./IconText";
import { DropdownParent } from "../utils/utils";

const AdminButton = (props) => {
  const { href = "", text = "Admin Panel", left, right, dropdown, hr } = props;
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser?.is_admin && (
        <>
          <DropdownParent
            dropdown={dropdown}
            wrapper={(children) => (
              <Dropdown.Item as="div">{children}</Dropdown.Item>
            )}>
            <a
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              href={process.env.REACT_APP_API_URL + "admin/" + href}>
              <IconText
                text={text}
                icon="screwdriver-wrench"
                left={left}
                right={right}
              />
            </a>
          </DropdownParent>
          {hr && !dropdown && <hr />}
          {hr && dropdown && <Dropdown.Divider />}
        </>
      )}
    </>
  );
};

export default AdminButton;
