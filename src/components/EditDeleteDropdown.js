import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDeleteDropdown.module.css";

const EditDeleteDropdown = (props) => {
  /* Destructuring the props object. */
  const { solid, opaque, handleEdit, handleDelete } = props;

  return (
    <Dropdown drop="down">
      {/* Button to open the edit & delete dropdown, with prop based classes */}
      <Dropdown.Toggle
        aria-label="Edit & Delete Dropdown"
        className={`${!opaque && styles.MenuOpacity} ${
          !solid && styles.MenuButton
        }`}>
        <i className="fa-solid fa-bars" />
      </Dropdown.Toggle>

      {/* Edit & delete dropdown menu. Buttons get their onClick functions
      from props*/}
      <Dropdown.Menu>
        <div className="w-100 btn-group">
          {/* Edit Button */}
          <Button
            aria-label="Edit"
            variant="secondary"
            className="w-50"
            onClick={handleEdit}>
            <i className="fa-solid fa-save" />
          </Button>
          {/* Delete Button */}
          <Button
            aria-label="Delete"
            variant="danger"
            className="w-50"
            onClick={handleDelete}>
            <i className="fa-solid fa-trash" />
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EditDeleteDropdown;
