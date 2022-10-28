import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/SearchFilterSortContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import LoadingSpinner from "./LoadingSpinner";
import NavButton from "./NavButton";
import useBreakpoints from "../hooks/useBreakpoints";
import styles from "../styles/PostSearch.module.css";

const PostSearch = () => {
  /* Destructuring the useSearchFilterSort() hook and assigning it to the variable
  query. */
  const { query } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md } = useBreakpoints();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /* Setting the state of the component. */
  const [searchQuery, setSearchQuery] = useState(query);
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  /* Setting the state of the component on change of context data. */
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  /* A useEffect hook that is called when the searchQuery state changes. It is used
  to fetch the posts from the server. */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        /* Attempts to retrieve the related posts to the users query. */
        const { data } = await axiosReq.get(
          `/posts/?ordering=-title_length&search=${searchQuery}`
        );
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    /* Timer to stop API calls on every character change. */
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /* Function to handle submitting of the search query. */
  const handleSubmit = (event) => {
    event.preventDefault();

    /* Checks if the current page is the home page, and 
    navigates to it if not. */
    pathname !== "/" && navigate("/");

    /* Sets the context data to the user's search query. */
    setSearchFilterSort((prevValues) => ({
      ...prevValues,
      query: searchQuery,
    }));
  };

  return (
    <Form className="d-flex h-100 align-items-center" onSubmit={handleSubmit}>
      <InputGroup>
        {/* New Post button rendered on small screens only
        using breakpoints hook. */}
        {!md && <NavButton to="newPost" left noText />}

        <Dropdown drop="down">
          {/* Search input, wrapped in Dropdown toggle to trigger search
          results dropdown. */}
          <Dropdown.Toggle
            className={`form-control p-0 ${styles.RemoveTransform}`}>
            <Form.Control
              role="searchbox"
              type="search"
              placeholder="Search"
              name="query"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="text-center form-control"
            />
            <Form.Label className="d-none">Search</Form.Label>
          </Dropdown.Toggle>

          {/* QuickSearch dropdown menu with popperConfig offsets to
          center menu. */}
          <Dropdown.Menu
            className={`pb-0 w-100 ${styles.QuickSearchMenu}`}
            align="start"
            popperConfig={
              !md && {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [-39, 3],
                    },
                  },
                ],
              }
            }>
            {/* Check if the post data has been recieved. */}
            {hasLoaded ? (
              <>
                {/* Check if the response data has any results. */}
                {posts.results.length ? (
                  <>
                    {/* Get first 5 results, and map them to dropdown items. */}
                    {posts.results.slice(0, 5).map((post) => (
                      <Dropdown.Item
                        as="div"
                        key={post.id}
                        className={`mb-2 text-center ${styles.QuickSearchItem}`}>
                        <NavLink to={`/posts/${post.id}`}>
                          <Card>
                            {/* Card with post data. */}
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
                  <>
                    {/* No results heading loaded if no results are found. */}
                    <h3>No Results</h3>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Loading spinner loaded if response has not been
                  received yet. */}
                <LoadingSpinner small />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Search Button for submitting quicksearch to full search. */}
        <Form.Label className="d-none">Search</Form.Label>
        <Button type="submit" aria-label="Search">
          <i className="fa-solid fa-search" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default PostSearch;
