import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/SearchFilterSortContext";
import { fetchCategories } from "../utils/utils";
import IconText from "./IconText";
import { useBreakpoints } from "../hooks";

const PostFilters = (props) => {
  const { filters } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { pathname } = useLocation();
  const { md } = useBreakpoints();

  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories(setCategories);
  }, [pathname]);

  const handleChange = (event) => {
    setSearchFilterSort((prevData) => ({
      ...prevData,
      filters: event.target.value,
    }));
  };

  const handleClear = () => {
    setSearchFilterSort((prevData) => ({ ...prevData, filters: "" }));
  };

  return (
    <Dropdown drop="down">
      <Dropdown.Toggle className={`w-25`}>
        <IconText text={md && "Filters"} icon="filter" left />
      </Dropdown.Toggle>
      <Form.Label className="d-none">Filters</Form.Label>

      <Dropdown.Menu>
        <Dropdown.Item as="div" className="btn-group">
          <Button onClick={handleClear} variant="danger">
            Clear
          </Button>
        </Dropdown.Item>

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
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostFilters;
