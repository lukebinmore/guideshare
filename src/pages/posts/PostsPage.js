import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PostBlurb from "./PostBlurb";
import { useLocation } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import { InputGroup, Spinner } from "react-bootstrap";
import InfiniteScroller from "react-infinite-scroll-component";
import { useSearchFilterSort } from "../../contexts/searchFilterSortContext";
import PostsSort from "../../components/PostsSort";
import PostResultsCount from "../../components/PostResultsCount";
import Filters from "../../components/Filters";
import LoadingSpinner from "../../components/LoadingSpinner";

const PostsPage = (props) => {
  const { pageFilter = "" } = props;
  const { pathname } = useLocation();
  const { query, filters, sort } = useSearchFilterSort();

  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const buildUrl = () => {
      return [
        "/posts/",
        "?" + pageFilter,
        "&category=" + filters.category,
        "&search=" + query,
        "&ordering=" + sort,
      ].join("");
    };

    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(buildUrl());
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [pathname, pageFilter, filters, query, sort]);

  return (
    <>
      {hasLoaded ? (
        <>
          {posts.results.length ? (
            <>
              <div className="mx-2 mb-2 px-1">
                <InputGroup>
                  <Filters category />
                  <PostResultsCount results={posts.count} />
                  <PostsSort />
                </InputGroup>
                <hr />
              </div>
              <InfiniteScroller
                className="overflow-visible d-flex flex-wrap justify-content-center"
                dataLength={posts.results.length}
                loader={<LoadingSpinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}>
                {posts.results.map((post) => (
                  <PostBlurb key={post.id} {...post} />
                ))}
              </InfiniteScroller>
            </>
          ) : (
            <h1>No Results</h1>
          )}
        </>
      ) : (
        <>
          <h1>Loading</h1>
          <Spinner animation="border" />
        </>
      )}
    </>
  );
};

export default PostsPage;
