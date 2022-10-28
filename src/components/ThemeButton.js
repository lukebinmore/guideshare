import React from "react";
import { useNavigate } from "react-router";
import { useSetSiteTheme } from "../contexts/ThemeContext";
import { ComponentParent } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";

const AdminButton = (props) => {
  /* Destructuring the props object. */
  const { left, right, dropdown, hr } = props;
  const setTheme = useSetSiteTheme();
  const navigate = useNavigate();

  /* If the theme is light, set it to dark, otherwise set it to light. */
  const handleClick = () => {
    const themeStorage = localStorage.getItem("THEME") || "light";
    localStorage.setItem("THEME", themeStorage === "light" ? "dark" : "light");
    setTheme(themeStorage);
    navigate(0);
  };

  return (
    <>
      {/* Wrapper that wraps the children with
      the wrapper if the condition is true. */}
      <ComponentParent
        condition={dropdown}
        wrapper={(children) => (
          <Dropdown.Item as="div">{children}</Dropdown.Item>
        )}>
        {/* Button to switch the theme */}
        <Button onClick={handleClick} aria-label="Change Theme">
          <IconText
            text={"Change Theme"}
            icon="paint-roller"
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

export default AdminButton;
