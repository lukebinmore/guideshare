import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import IconText from "./IconText";
import { DropdownParent } from "../utils/utils";
import { useSetSiteTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";

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
      <DropdownParent
        dropdown={dropdown}
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
      </DropdownParent>
      {hr && !dropdown && <hr />}
      {hr && dropdown && <Dropdown.Divider />}
    </>
  );
};

export default AdminButton;
