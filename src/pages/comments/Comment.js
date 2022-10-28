import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import EditDeleteDropdown from "../../components/EditDeleteDropdown";
import ProfileButton from "../../components/ProfileButton";
import VoteFooter from "../../components/VoteFooter";
import useBreakpoints from "../../hooks/useBreakpoints";
import CommentCreateEditForm from "./CommentCreateEditForm";

const Comment = (props) => {
  /* Destructuring the props object and assigning it to the commentData variable. */
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

  /* Function that uses the axiosRes.delete method to delete the comment with
  the id of the comment that was clicked on. Clears comment data from state. */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setCommentData({});
    } catch (err) {}
  };

  return (
    <>
      {/* Conditionally render content if content id exists in state. */}
      {commentData?.id && (
        <>
          {/* Conditionally redner comment edit form if edit state is true,
          renders comment details if false. */}
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
                  horizontal
                />
                <p className="m-0 text-muted">{created_at}</p>
              </Card.Header>

              <Card.Body className="d-flex justify-content-between align-items-center p-2">
                <div className="text-start">{content}</div>
                {/* Conditionally renders edit and delete dropdown if user
                  is owner of comment, */}
                {is_owner && (
                  <EditDeleteDropdown
                    solid
                    opaque
                    handleEdit={() => setEdit(true)}
                    handleDelete={handleDelete}
                  />
                )}
              </Card.Body>

              {/* Renders vote footer with relevent props so users can like
              and dislike comment. */}
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
