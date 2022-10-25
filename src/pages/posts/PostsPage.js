import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PostBlurb from "./PostBlurb";
import { useLocation } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import { InputGroup } from "react-bootstrap";
import InfiniteScroller from "react-infinite-scroll-component";
import { useSearchFilterSort } from "../../contexts/SearchFilterSortContext";
import {
  LoadingSpinner,
  PostFilters,
  PostSort,
  PostResultsCount,
} from "../../components";
import Profiles from "../profiles/Profiles";

const PostsPage = (props) => {
  const { pageFilter = "", message } = props;
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
      <Profiles />
      {hasLoaded ? (
        <>
          {posts.results.length ? (
            <>
              <div className="mx-2 mb-2 px-1">
                <InputGroup>
                  <PostFilters category />
                  <PostResultsCount results={posts.count} />
                  <PostSort />
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
            <>
              <h1>No Results</h1>
              <p>{message}</p>
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PostsPage;
