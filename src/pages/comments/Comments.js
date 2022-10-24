import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { LoadingSpinner } from "../../components";
import { fetchMoreData } from "../../utils/utils";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/comments/?post=${id}`);
        setComments(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchComments();
  }, [id]);
  return (
    <>
      {hasLoaded ? (
        <InfiniteScroll
          className="overflow-visible"
          dataLength={comments.results.length}
          loader={<LoadingSpinner />}
          hasMore={!!comments.next}
          next={() => fetchMoreData(comments, setComments)}>
          {comments.results.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </InfiniteScroll>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Comments;
