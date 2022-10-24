import React from "react";
import { Card } from "react-bootstrap";
import {
  EditDeleteDropdown,
  ProfileButton,
  VoteFooter,
} from "../../components";
import { useBreakpoints } from "../../hooks";

const Comment = (props) => {
  const {
    id,
    owner,
    is_owner,
    profile_id,
    profile_picture,
    content,
    created_at,
    like_id,
    likes_count,
    dislike_id,
    dislikes_count,
  } = props;
  const { md } = useBreakpoints();

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center p-2">
        <ProfileButton
          profile_id={profile_id}
          src={md && profile_picture}
          username={owner}
          small
        />
        <p className="m-0 text-muted">{created_at}</p>
      </Card.Header>

      <Card.Body className="d-flex justify-content-between align-items-center py-2 px-3">
        <div className="text-start">{content}</div>
        {is_owner && <EditDeleteDropdown solid />}
      </Card.Body>

      <VoteFooter
        comment_id={id}
        like_id={like_id}
        likes_count={likes_count}
        dislike_id={dislike_id}
        dislikes_count={dislikes_count}
      />
    </Card>
  );
};

export default Comment;
