import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import { NavButton } from "./Buttons";

const Search = (props) => {
  const { query } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchFilterSort((prevValues) => ({
      ...prevValues,
      query: searchQuery,
    }));
  };

  return (
    <Form className="d-flex h-100 align-items-center" onSubmit={handleSubmit}>
      <InputGroup>
        <NavButton
          to="newPost"
          left
          className="d-md-none d-inline-block"
          noText
        />
        <Form.Label className="d-none">Search</Form.Label>
        <Form.Control
          type="search"
          placeholder="Search"
          name="query"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="text-center form-control"
        />
        <Button type="submit">
          <i className="fa-solid fa-search" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
