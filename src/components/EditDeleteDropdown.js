import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styles from "../styles/EditDeleteDropdown.module.css";

const EditDeleteDropdown = (props) => {
  const { solid, handleEdit, handleDelete } = props;

  return (
    <Dropdown drop="down">
      <Dropdown.Toggle
        className={!solid && `${styles.MenuOpacity} ${styles.MenuButton}`}>
        <i className="fa-solid fa-bars" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="w-100 btn-group">
          <Button variant="secondary" className="w-50" onClick={handleEdit}>
            <i className="fa-solid fa-save" />
          </Button>
          <Button variant="danger" className="w-50" onClick={handleDelete}>
            <i className="fa-solid fa-trash" />
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EditDeleteDropdown;
