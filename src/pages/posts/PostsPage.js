import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PostBlurb from "./PostBlurb";
import SearchFilterOrder from "../../components/SearchFilterOrder";
import { useLocation } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import { Spinner } from "react-bootstrap";
import InfiniteScroller from "react-infinite-scroll-component";
import { useSearchFilterSort } from "../../contexts/searchFilterSortContext";

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
  }, [pathname, pageFilter, filters, query]);

  return (
    <>
      {hasLoaded ? (
        <>
          {posts.results.length ? (
            <>
              <div className="mx-2 mb-2 px-1">
                <SearchFilterOrder filter results={posts.count} sort />
                <hr />
              </div>
              <InfiniteScroller
                className="overflow-visible"
                dataLength={posts.results.length}
                loader={
                  <div className="w-100">
                    <h1>Loading</h1>
                    <Spinner animation="border" />
                  </div>
                }
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
