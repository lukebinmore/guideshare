import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PostBlurb from "./PostBlurb";
import { useNavigate } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { Spinner } from "react-bootstrap";

const PostsPage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState({ results: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [navigate]);

  const sizes = [
    { columns: 1, gutter: 16 },
    { mq: "768px", columns: 2, gutter: 16 },
    { mq: "1200px", columns: 3, gutter: 16 },
    { mq: "1400px", columns: 4, gutter: 16 },
  ];

  return (
    <>
      <MasonryInfiniteScroller
        className="mx-auto"
        sizes={sizes}
        loader={<Spinner animation="grow" />}
        hasMore={!!posts.next}
        loadMore={() => fetchMoreData(posts, setPosts)}>
        {posts.results.map((post) => (
          <PostBlurb key={post.id} {...post} />
        ))}
      </MasonryInfiniteScroller>
    </>
  );
};

export default PostsPage;
