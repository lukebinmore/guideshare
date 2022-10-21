import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import { fetchCategories } from "../utils/utils";
import styles from "../styles/SearchFilterOrder.module.css";
import { useLocation } from "react-router";
import IconText from "./IconText";

const SearchFilterOrder = (props) => {
  const { search, filter, sort, results } = props;
  const searchFilterSort = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { pathname } = useLocation();

  const [categories, setCategories] = useState();
  const [filterData, setFilterData] = useState(searchFilterSort);
  const { query, filters, order } = filterData;

  useEffect(() => {
    setFilterData(searchFilterSort);
  }, [searchFilterSort]);

  useEffect(() => {
    fetchCategories(setCategories);
  }, [pathname]);

  const handleFilterChange = (event) => {
    setFilterData((prevData) => ({
      ...prevData,
      filters: {
        ...prevData.filters,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFilterData({
      ...filterData,
      filters: { ...filterData.category, category: "test" },
    });

    setSearchFilterSort((prevValues) => ({ ...prevValues, ...filterData }));
  };

  const filterMenu = (
    <Dropdown.Menu className="w-100">
      <Dropdown.Item as="div" className="btn-group">
        <Button type="submit">Apply</Button>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Form.Select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}>
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
  );

  const filterInput = (
    <Dropdown>
      <Form.Label className="d-none">Filters</Form.Label>
      <Dropdown.Toggle className={styles.FilterButton}>
        <p className="d-md-inline d-none">Filters </p>
        <i className="fa-solid fa-filter" />
      </Dropdown.Toggle>
      {filterMenu}
    </Dropdown>
  );

  const searchInput = (
    <>
      <Form.Label className="d-none">Search</Form.Label>
      <Form.Control
        type="search"
        placeholder="Search"
        name="query"
        value={query}
        onChange={(event) =>
          setFilterData({ ...filterData, query: event.target.value })
        }
        className="text-center form-control"
      />
      <Button type="submit">
        <i className="fa-solid fa-search" />
      </Button>
    </>
  );

  return (
    <Form className="d-flex h-100 align-items-center" onSubmit={handleSubmit}>
      <InputGroup>
        {filter && filterInput}
        {results && (
          <Form.Control
            readOnly
            defaultValue={`Results: ${results}`}
            className="text-center"
          />
        )}
        {search && searchInput}
      </InputGroup>
    </Form>
  );
};

export default SearchFilterOrder;
