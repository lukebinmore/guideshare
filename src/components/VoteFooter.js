import React, { useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/VoteFooter.module.css";

const voteValues = {
  like: 0,
  dislike: 1,
};

const VoteFooter = (props) => {
  /* Destructuring the props object and setting default values for post_id and
  comment_id. */
  const [voteData, setVoteData] = useState(props);
  const {
    post_id = null,
    comment_id = null,
    like_id,
    dislike_id,
    likes_count,
    dislikes_count,
    comments_count,
  } = voteData;

  const { md } = useBreakpoints();
  const currentUser = useCurrentUser();

  /* Function to handle like and dislike button clicks. */
  const handleClick = async (event) => {
    /* Creating variableS based on the button clicked. */
    const voteName = event.target.name + "_id";
    const voteCountName = event.target.name + "s_count";
    const voteValue = voteValues[event.target.name];

    /* Creating a vote object with relevent data. */
    const vote = {
      post: post_id,
      comment: comment_id,
      vote: voteValue,
    };

    try {
      /* Condition to determin if vote already exists. */
      if (voteData[voteName]) {
        /* Attempt to delete vote. */
        await axiosReq.delete(`/votes/${voteData[voteName]}`);
        /* Remove existing vote from vote data and reduce vote count. */
        setVoteData((prevData) => ({
          ...prevData,
          [voteName]: null,
          [voteCountName]: prevData[voteCountName] - 1,
        }));
      } else {
        /* Attempt to create vote. */
        const { data } = await axiosRes.post("/votes/", vote);
        /* Update vote data with new vote and increase vote count. */
        setVoteData((prevData) => ({
          ...prevData,
          [voteName]: data.id,
          [voteCountName]: prevData[voteCountName] + 1,
        }));
      }
    } catch (err) {}
  };

  return (
    <Card.Footer className="p-0 text-end">
      {/* Button for dislikes. */}
      {currentUser && (
        <Button
          aria-label="Dislike"
          name="dislike"
          variant="secondary"
          className={dislike_id && styles.Clicked}
          onClick={handleClick}
          size={post_id && md && "lg"}>
          <IconText
            text={dislikes_count < 1000 ? dislikes_count : "999+"}
            icon="thumbs-down"
            right
          />
        </Button>
      )}

      {/* Conditionally loaded comments count based on provided props. */}
      {post_id && (
        <div className={`btn ${md && "btn-lg"} ${styles.CommentsCount}`}>
          <IconText
            text={comments_count < 1000 ? comments_count : "999+"}
            icon="comments"
            right
          />
        </div>
      )}

      {/* Button for likes. */}
      {currentUser && (
        <Button
          aria-label="Like"
          name="like"
          className={like_id && styles.Clicked}
          onClick={handleClick}
          size={post_id && md && "lg"}>
          <IconText
            text={likes_count < 1000 ? likes_count : "999+"}
            icon="thumbs-up"
            right
          />
        </Button>
      )}
    </Card.Footer>
  );
};

export default VoteFooter;
