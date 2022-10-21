import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import styles from "../styles/Filters.module.css";
import { fetchCategories } from "../utils/utils";

const Filters = (props) => {
  const { category } = props;

  const { filters } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { pathname } = useLocation();

  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories(setCategories);
  }, [pathname]);

  const handleChange = (event) => {
    setSearchFilterSort((prevData) => ({
      ...prevData,
      filters: {
        ...prevData.filters,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleClear = () => {
    setSearchFilterSort((prevData) => ({
      ...prevData,
      filters: {
        ...prevData.filters,
        category: category ? "" : filters.category,
      },
    }));
  };

  return (
    <Dropdown drop="down">
      <Form.Label className="d-none">Filters</Form.Label>
      <Dropdown.Toggle className={`w-25 ${styles.FilterButton}`}>
        <i className="fa-solid fa-filter" />
        <p className="d-md-inline d-none"> Filters</p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="div" className="btn-group">
          <Button onClick={handleClear} variant="danger">
            Clear
          </Button>
        </Dropdown.Item>

        {category && (
          <>
            <Dropdown.Divider />
            <Form.Select
              name="category"
              value={filters?.category}
              onChange={handleChange}>
              <option value="" disabled>
                Select A Category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Form.Select>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filters;
