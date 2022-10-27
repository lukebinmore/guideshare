import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import LoadingSpinner from "../../components/LoadingSpinner";
import Comment from "./Comment";
import CommentCreateEditForm from "./CommentCreateEditForm";

const Comments = ({ id }) => {
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`comments/?post=${id}`);
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
          <CommentCreateEditForm id={id} setState={setComments} />
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
