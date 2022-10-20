import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PostBlurb from "./PostBlurb";
import { useNavigate } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import { Spinner } from "react-bootstrap";
import InfiniteScroller from "react-infinite-scroll-component";
import { useSearchFilterSort } from "../../contexts/searchFilterSortContext";

const PostsPage = (props) => {
  const { pageFilter = "" } = props;
  const navigate = useNavigate();
  const { query, filters, sort } = useSearchFilterSort();

  const [posts, setPosts] = useState({ results: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?${pageFilter}&search=${query}`
        );
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [navigate, pageFilter, query]);

  return (
    <>
      {posts.results.length ? (
        <InfiniteScroller
          className="overflow-visible"
          dataLength={posts.results.length}
          loader={
            <div className="w-100">
              <Spinner animation="grow" />
            </div>
          }
          hasMore={!!posts.next}
          next={() => fetchMoreData(posts, setPosts)}>
          {posts.results.map((post) => (
            <PostBlurb key={post.id} {...post} />
          ))}
        </InfiniteScroller>
      ) : (
        <h1>No Results</h1>
      )}
    </>
  );
};

export default PostsPage;
