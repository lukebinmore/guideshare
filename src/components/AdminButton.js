import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { ComponentParent } from "../utils/utils";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";
import Button from "react-bootstrap/Button";

const AdminButton = (props) => {
  const { href = "", text = "Admin Panel", left, right, dropdown, hr } = props;
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser?.is_admin && (
        <>
          <ComponentParent
            condition={dropdown}
            wrapper={(children) => (
              <Dropdown.Item as="div">{children}</Dropdown.Item>
            )}>
            <Button
              aria-label={text}
              target="_blank"
              rel="noreferrer"
              href={process.env.REACT_APP_API_URL + "admin/" + href}>
              <IconText
                text={text}
                icon="screwdriver-wrench"
                left={left}
                right={right}
              />
            </Button>
          </ComponentParent>
          {hr && !dropdown && <hr />}
          {hr && dropdown && <Dropdown.Divider />}
        </>
      )}
    </>
  );
};

export default AdminButton;
