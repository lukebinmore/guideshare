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

  const [sortDecending, setSortDecending] = useState(false);
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

  const handleSortChange = (event) => {
    const newOrder = () => {
      const oldOrder = searchFilterSort.sort;

      if (oldOrder === event) {
        setSortDecending(true);
        return "-" + event;
      } else if (oldOrder === "-" + event) {
        setSortDecending(false);
        return event;
      } else {
        setSortDecending(false);
        return event;
      }
    };

    setSearchFilterSort({ ...searchFilterSort, sort: newOrder() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchFilterSort((prevValues) => ({ ...prevValues, ...filterData }));
  };

  const filterMenu = (
    <Dropdown.Menu>
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
    <Dropdown drop="down">
      <Form.Label className="d-none">Filters</Form.Label>
      <Dropdown.Toggle className={styles.FilterButton}>
        <i className="fa-solid fa-filter" />
        <p className="d-md-inline d-none"> Filters</p>
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

  const getIcon = () => {
    return sortDecending ? "angle-down" : "angle-up";
  };

  const sortMenu = (
    <Dropdown.Menu className="text-end">
      <Dropdown.Item eventKey="title" as="div">
        <IconText
          text="Title"
          icon={getIcon()}
          left={searchFilterSort.sort.includes("title")}
        />
      </Dropdown.Item>
      <Dropdown.Item eventKey="created_at" as="div">
        <IconText
          text="Date Created"
          icon={getIcon()}
          left={searchFilterSort.sort.includes("created_at")}
        />
      </Dropdown.Item>
      <Dropdown.Item eventKey="likes_count" as="div">
        <IconText
          text="Likes"
          icon={getIcon()}
          left={searchFilterSort.sort.includes("likes_count")}
        />
      </Dropdown.Item>
      <Dropdown.Item eventKey="dislikes_count" as="div">
        <IconText
          text="Dislikes"
          icon={getIcon()}
          left={searchFilterSort.sort.includes("dislikes_count")}
        />
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  const sortInput = (
    <Dropdown drop="down" onSelect={handleSortChange}>
      <Form.Label className="d-none">Results Sorting</Form.Label>
      <Dropdown.Toggle>
        <p className="d-md-inline d-none">{order ? order : "Sort"} </p>
        <i className="fa-solid fa-sort" />
      </Dropdown.Toggle>
      {sortMenu}
    </Dropdown>
  );

  return (
    <Form className="d-flex h-100 align-items-center" onSubmit={handleSubmit}>
      <InputGroup>
        {filter && filterInput}
        {results && (
          <Form.Control
            readOnly
            defaultValue={`Results: ${results < 1000 ? results : "999+"}`}
            className="text-center"
          />
        )}
        {search && searchInput}
        {sort && sortInput}
      </InputGroup>
    </Form>
  );
};

export default SearchFilterOrder;
