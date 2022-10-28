import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router";
import InfiniteScroller from "react-infinite-scroll-component";
import { useSearchFilterSort } from "../../contexts/SearchFilterSortContext";
import { fetchMoreData } from "../../utils/utils";
import InputGroup from "react-bootstrap/InputGroup";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostFilters from "../../components/PostFilters";
import PostResultsCount from "../../components/PostResultsCount";
import PostSort from "../../components/PostSort";
import PostBlurb from "./PostBlurb";
import Profiles from "../profiles/Profiles";

const PostsPage = (props) => {
  /* Destructuring the props and state. */
  const { pageFilter = "", message, popularProfiles } = props;
  const { pathname } = useLocation();
  const { query, filters, sort } = useSearchFilterSort();

  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  /* Function to get initial post list based on relevant filters and sorting. */
  useEffect(() => {
    /* Function that builds the url from the relevent props and states. */
    const buildUrl = () => {
      return [
        "/posts/",
        "?" + pageFilter,
        "&category=" + filters,
        "&search=" + query,
        "&ordering=" + sort,
      ].join("");
    };

    /* Function to get post list based on built URL. */
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(buildUrl());
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    fetchPosts();
  }, [pathname, pageFilter, filters, query, sort]);

  return (
    <>
      {/* Conditionally rendered popular profiles component. */}
      {popularProfiles && (
        <Profiles sort="-popularity" title="Recommended Profiles" />
      )}
      {/* Conditionally loads content if API call has returned response. */}
      {hasLoaded ? (
        <>
          {/* Post Filter, results count and sort section. */}
          <div className="mx-2 mb-2 px-1">
            <InputGroup>
              <PostFilters />
              <PostResultsCount results={posts.count} />
              <PostSort />
            </InputGroup>
            <hr />
          </div>
          {/* Conditionally renders content if response returned results. */}
          {posts.results.length ? (
            <>
              {/* Infinite scroller that loads more content when the last item
              from the current page of results comes into view. */}
              <InfiniteScroller
                className="overflow-visible d-flex flex-wrap justify-content-center"
                dataLength={posts.results.length}
                loader={<LoadingSpinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}>
                {/* Map results into postblurb components with relevent 
                props */}
                {posts.results.map((post) => (
                  <PostBlurb key={post.id} {...post} />
                ))}
              </InfiniteScroller>
            </>
          ) : (
            <>
              {/* Conditionally rendered no results header. */}
              <h1>
                No Guides <i className="fa-solid fa-face-sad-tear" />
              </h1>
              <p>{message}</p>
            </>
          )}
        </>
      ) : (
        <>
          {/* Conditionally rendered loading spinner if no API resposne
            yet. */}
          <LoadingSpinner />
        </>
      )}
    </>
  );
};

export default PostsPage;
