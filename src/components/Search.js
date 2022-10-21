import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import { NavButton } from "./Buttons";
import useBreakpoints from "../hooks/useBreakpoints";

const Search = () => {
  const { query } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md, lg } = useBreakpoints();

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
        {!md && <NavButton to="newPost" left noText />}
        <Form.Control
          type="search"
          placeholder="Search"
          name="query"
          size={lg && "lg"}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="text-center form-control"
        />
        <Form.Label className="d-none">Search</Form.Label>
        <Button type="submit" size={lg && "lg"}>
          <i className="fa-solid fa-search" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
