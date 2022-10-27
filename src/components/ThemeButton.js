import React from "react";
import { useNavigate } from "react-router";
import { useSetSiteTheme } from "../contexts/ThemeContext";
import { ComponentParent } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import IconText from "./IconText";

const AdminButton = (props) => {
  const { left, right, dropdown, hr } = props;
  const setTheme = useSetSiteTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    const themeStorage = localStorage.getItem("THEME") || "light";
    localStorage.setItem("THEME", themeStorage === "light" ? "dark" : "light");
    setTheme(themeStorage);
    navigate(0);
  };

  return (
    <>
      <ComponentParent
        condition={dropdown}
        wrapper={(children) => (
          <Dropdown.Item as="div">{children}</Dropdown.Item>
        )}>
        <Button onClick={handleClick}>
          <IconText
            text={"Change Theme"}
            icon="paint-roller"
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

export default AdminButton;
