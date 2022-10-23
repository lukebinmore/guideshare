import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosRes } from "../api/axiosDefaults";
import styles from "../styles/EditDeleteDropdown.module.css";

const EditDeleteDropdown = (props) => {
  const { solid, target, id } = props;
  const navigate = useNavigate();

  const handleEdit = () => {
    if (target === "post") {
      navigate(`/posts/edit/${id}`);
    }
  };

  const handleDelete = async () => {
    if (target === "post") {
      try {
        await axiosRes.delete(`/posts/${id}`);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Dropdown drop="down">
      <Dropdown.Toggle
        className={`${styles.MenuButton} ${!solid && styles.MenuOpacity}`}>
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
