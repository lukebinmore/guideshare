import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Card, Dropdown, Form, InputGroup } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import { NavButton } from "./Buttons";
import useBreakpoints from "../hooks/useBreakpoints";
import LoadingSpinner from "../components/LoadingSpinner";
import { axiosReq } from "../api/axiosDefaults";
import { NavLink } from "react-router-dom";
import styles from "../styles/Search.module.css";

const Search = () => {
  const { query } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md } = useBreakpoints();

  const [searchQuery, setSearchQuery] = useState(query);
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?search=${searchQuery}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

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

        <Dropdown drop="down">
          <Dropdown.Toggle
            as="input"
            type="search"
            placeholder="Search"
            name="query"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="text-center form-control"
          />

          <Dropdown.Menu
            className={`pb-0 w-100 ${styles.QuickSearchMenu}`}
            align="start">
            {hasLoaded ? (
              <>
                {posts.results.length ? (
                  <>
                    {posts.results.slice(0, 5).map((post) => (
                      <Dropdown.Item
                        as="div"
                        key={post.id}
                        className={`mb-2 text-center ${styles.QuickSearchItem}`}>
                        <NavLink to={`/post/${post.id}`}>
                          <Card>
                            <Card.Header>
                              <h4>{post.title}</h4>
                            </Card.Header>
                            <Card.Body className="p-1">
                              <p className="m-0 text-muted">
                                {post.category_title}
                              </p>
                            </Card.Body>
                            <Card.Footer className="p-1" />
                          </Card>
                        </NavLink>
                      </Dropdown.Item>
                    ))}
                  </>
                ) : (
                  <h3>No Results</h3>
                )}
              </>
            ) : (
              <LoadingSpinner small />
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Label className="d-none">Search</Form.Label>
        <Button type="submit">
          <i className="fa-solid fa-search" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
