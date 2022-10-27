import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { NavLink } from "react-router-dom";
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
import styles from "../styles/Search.module.css";

const PostSearch = () => {
  const { query } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md } = useBreakpoints();

  const [searchQuery, setSearchQuery] = useState(query);
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
            {hasLoaded ? (
              <>
                {posts.results.length ? (
                  <>
                    {posts.results.slice(0, 5).map((post) => (
                      <Dropdown.Item
                        as="div"
                        key={post.id}
                        className={`mb-2 text-center ${styles.QuickSearchItem}`}>
                        <NavLink to={`/posts/${post.id}`}>
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

export default PostSearch;
