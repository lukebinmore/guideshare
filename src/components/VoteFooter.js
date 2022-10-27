import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import IconText from "./IconText";
import styles from "../styles/VoteFooter.module.css";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useBreakpoints } from "../hooks";

const voteValues = {
  like: 0,
  dislike: 1,
};

const VoteFooter = (props) => {
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

  const handleClick = async (event) => {
    const voteName = event.target.name + "_id";
    const voteCountName = event.target.name + "s_count";
    const voteValue = voteValues[event.target.name];

    const vote = {
      post: post_id,
      comment: comment_id,
      vote: voteValue,
    };

    try {
      if (voteData[voteName]) {
        await axiosReq.delete(`/votes/${voteData[voteName]}`);
        setVoteData((prevData) => ({
          ...prevData,
          [voteName]: null,
          [voteCountName]: prevData[voteCountName] - 1,
        }));
      } else {
        const { data } = await axiosRes.post("/votes/", vote);
        setVoteData((prevData) => ({
          ...prevData,
          [voteName]: data.id,
          [voteCountName]: prevData[voteCountName] + 1,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card.Footer className="p-0 text-end">
      <Button
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

      {post_id && (
        <div className={`btn ${md && "btn-lg"} ${styles.CommentsCount}`}>
          <IconText
            text={comments_count < 1000 ? comments_count : "999+"}
            icon="comments"
            right
          />
        </div>
      )}

      <Button
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
    </Card.Footer>
  );
};

export default VoteFooter;
