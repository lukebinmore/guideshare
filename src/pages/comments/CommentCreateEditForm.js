import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AuthButton from "../../components/AuthButton";
import Avatar from "../../components/Avatar";
import FormInput from "../../components/FormInput";
import styles from "../../styles/CommentCreateEditForm.module.css";

const CommentCreateEditForm = (props) => {
  /* Destructuring the props object. */
  const { id, setState, setEdit, initialData } = props;
  const currentUser = useCurrentUser();

  const [errors, setErrors] = useState();

  /* Function that handles submitted form data. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the event. */
    const formData = collectFormData(event);
    /* Checking if initialData is true, if it is, it will append the id to the
    formData, if not, it will append the post to the formData. */
    initialData ? formData.append("id", id) : formData.append("post", id);

    try {
      /* Attempts to create new comment if no initial data is provided, or
      update existing comment if it is. */
      if (!initialData) {
        const { data } = await axiosReq.post(`comments/`, formData);
        setState((prevData) => ({
          ...prevData,
          results: [data, ...prevData.results],
        }));
        /* Clears form after submitting. */
        event.target.reset();
      } else {
        const { data } = await axiosReq.put(`comments/${id}/`, formData);
        setState(data);
        setEdit(false);
      }
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      {/* Checks if user is logged in, renders content if they are, or call
      to action if not. */}
      {currentUser ? (
        <Form className="card mb-2" onSubmit={handleSubmit}>
          <Card.Header>
            <p>Comment as: {currentUser?.username}</p>
          </Card.Header>
          <Card.Body className="p-2 w-100 d-flex align-items-center">
            <div className={styles.NewCommentImage}>
              <Avatar src={currentUser?.profile_picture} />
            </div>
            <div className="w-100 ms-2">
              <FormInput
                as="textarea"
                rows={5}
                name="content"
                label="New Comment"
                initialData={initialData}
                errorData={errors?.content}
              />
            </div>
          </Card.Body>

          <Card.Footer className="text-end p-0">
            <Button aria-label="Comment" type="submit">
              Comment
            </Button>
          </Card.Footer>
        </Form>
      ) : (
        <div className="mb-2">
          <h3>Login or Signup to Comment!</h3>
          <div className="btn-group w-100">
            <AuthButton left right />
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCreateEditForm;
