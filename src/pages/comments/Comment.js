import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import {
  EditDeleteDropdown,
  ProfileButton,
  VoteFooter,
} from "../../components";
import { useBreakpoints } from "../../hooks";
import CommentCreateEditForm from "./CommentCreateEditForm";

const Comment = (props) => {
  const [commentData, setCommentData] = useState(props);
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
  } = commentData;
  const { md } = useBreakpoints();

  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setCommentData({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {commentData?.id && (
        <>
          {edit ? (
            <CommentCreateEditForm
              id={id}
              setState={setCommentData}
              setEdit={setEdit}
              initialData={content}
            />
          ) : (
            <Card className="mb-2">
              <Card.Header className="d-flex justify-content-between align-items-center p-2">
                <ProfileButton
                  profile_id={profile_id}
                  src={md && profile_picture}
                  username={owner}
                  small
                />
                <p className="m-0 text-muted">{created_at}</p>
              </Card.Header>

              <Card.Body className="d-flex justify-content-between align-items-center p-2">
                <div className="text-start">{content}</div>
                {is_owner && (
                  <EditDeleteDropdown
                    solid
                    opaque
                    handleEdit={() => setEdit(true)}
                    handleDelete={handleDelete}
                  />
                )}
              </Card.Body>

              <VoteFooter
                comment_id={id}
                like_id={like_id}
                likes_count={likes_count}
                dislike_id={dislike_id}
                dislikes_count={dislikes_count}
              />
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Comment;
