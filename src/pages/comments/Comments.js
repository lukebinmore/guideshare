import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import LoadingSpinner from "../../components/LoadingSpinner";
import Comment from "./Comment";
import CommentCreateEditForm from "./CommentCreateEditForm";

const Comments = ({ id }) => {
  /* Setting the initial state of the component. */
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  /* Function that gets a list of comments based on a post id. */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`comments/?post=${id}`);
        setComments(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    fetchComments();
  }, [id]);
  return (
    <>
      {/* Conditionally renders content if response has been received. */}
      {hasLoaded ? (
        <InfiniteScroll
          className="overflow-visible"
          dataLength={comments.results.length}
          loader={<LoadingSpinner />}
          hasMore={!!comments.next}
          next={() => fetchMoreData(comments, setComments)}>
          {/* Adds comment create edit form before comment results. */}
          <CommentCreateEditForm id={id} setState={setComments} />
          {/* Maps comments to Comment components. */}
          {comments.results.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </InfiniteScroll>
      ) : (
        <>
          {/* Conditionally renders loading spinner if response has not been
          received yet. */}
          <LoadingSpinner />
        </>
      )}
    </>
  );
};

export default Comments;
