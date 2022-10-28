import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { ComponentParent } from "../utils/utils";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";
import Button from "react-bootstrap/Button";

const AdminButton = (props) => {
  /* Destructuring the props object. */
  const { href = "", text = "Admin Panel", left, right, dropdown, hr } = props;
  const currentUser = useCurrentUser();

  return (
    <>
      {/* Checking if the current user is an admin. If they are, it will render the
      button. If not, it will not render the button. */}
      {currentUser?.is_admin && (
        <>
          {/* Wrapper that will wrap the children
          in the wrapper if the condition is true. */}
          <ComponentParent
            condition={dropdown}
            wrapper={(children) => (
              <Dropdown.Item as="div">{children}</Dropdown.Item>
            )}>
            {/* Creating a button that will open a new tab with the link. */}
            <Button
              aria-label={text}
              target="_blank"
              rel="noreferrer"
              href={process.env.REACT_APP_API_URL + "admin/" + href}>
              {/* A component that is used to render an icon and text. */}
              <IconText
                text={text}
                icon="screwdriver-wrench"
                left={left}
                right={right}
              />
            </Button>
          </ComponentParent>
          {/* Rendering a hr or a dropdown divider if the hr prop is true. */}
          {hr && !dropdown && <hr />}
          {hr && dropdown && <Dropdown.Divider />}
        </>
      )}
    </>
  );
};

export default AdminButton;
