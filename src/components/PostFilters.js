import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/SearchFilterSortContext";
import { fetchCategories } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";

const PostFilters = (props) => {
  /* Destructuring the useSearchFilterSort() and useSetSearchFilterSort() and
  useLocation() and useBreakpoints() hooks. */
  const { filters } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { pathname } = useLocation();
  const { md } = useBreakpoints();

  const [categories, setCategories] = useState();

  /* Fetching the categories from the database and setting the state of categories
  to the fetched categories. */
  useEffect(() => {
    fetchCategories(setCategories);
  }, [pathname]);

  /* Function to set the filter context on user input. */
  const handleChange = (event) => {
    setSearchFilterSort((prevData) => ({
      ...prevData,
      filters: event.target.value,
    }));
  };

  /* Function to clear filters context data. */
  const handleClear = () => {
    setSearchFilterSort((prevData) => ({ ...prevData, filters: "" }));
  };

  return (
    <Dropdown drop="down">
      {/* Filters dropdown button. */}
      <Dropdown.Toggle aria-label="Filters" className={`w-25`}>
        <IconText text={md && "Filters"} icon="filter" left />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Clear Filters Button. */}
        <Dropdown.Item as="div" className="btn-group">
          <Button
            onClick={handleClear}
            variant="danger"
            aria-label="Clear Filters">
            Clear
          </Button>
        </Dropdown.Item>

        <Dropdown.Divider />
        {/* Category Input, provided with passed props. */}
        <Form.Select
          name="category"
          value={filters?.category}
          onChange={handleChange}>
          <option value="" disabled>
            Select A Category
          </option>
          {/* Mapping over categories returned from database, and rendering 
          them as select options. */}
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Form.Select>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostFilters;
