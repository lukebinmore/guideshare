import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";

const SearchFilterOrder = (props) => {
  const { search } = props;
  const searchFilterSort = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();

  const [filterData, setfilterData] = useState(searchFilterSort);
  const { query, filters, sort } = filterData;

  useEffect(() => {
    setfilterData(searchFilterSort);
  }, [searchFilterSort]);

  const handleChange = (event) => {
    setfilterData({ ...filterData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchFilterSort((prevValues) => ({ ...prevValues, ...filterData }));
  };

  return (
    <Form className="d-flex h-100 align-items-center" onSubmit={handleSubmit}>
      <Form.Group controlId="search" className="w-100">
        <InputGroup>
          {search && (
            <>
              <Form.Control
                type="search"
                placeholder="Search"
                name="query"
                value={query}
                onChange={handleChange}
                className="text-center"
              />
              <Button type="submit">
                <i className="fa-solid fa-search" />
              </Button>
            </>
          )}
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchFilterOrder;
