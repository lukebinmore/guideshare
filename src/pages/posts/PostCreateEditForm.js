import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router";
import { collectFormData, fetchCategories } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AdminButton from "../../components/AdminButton";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import IconText from "../../components/IconText";
import LoadingSpinner from "../../components/LoadingSpinner";
import useBreakpoints from "../../hooks/useBreakpoints";
import styles from "../../styles/PostCreateEditForm.module.css";

const PostCreateEditForm = ({ edit }) => {
  /* Destructuring the id, md, and navigate from the useParams, useBreakpoints, and
  useNavigate hooks. */
  const { id } = useParams();
  const { md } = useBreakpoints();
  const navigate = useNavigate();

  /* Setting the initial state of the component. */
  const [hasLoaded, setHasLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState();
  const [post, setPost] = useState({});
  const { title, category, content, wip } = post;
  const [coverImage, setCoverImage] = useState();

  /* Fetching the categories from the database and setting them to the state. */
  useEffect(() => {
    fetchCategories(setCategories);
  }, [navigate]);

  /* Function to get post data, redirects to restricted page if not owner. */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        data.is_owner ? setPost(data) : navigate("/restricted");
        setCoverImage(data.cover_image);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    !edit && setCoverImage("");
    edit && handleMount();
  }, [id, navigate, edit]);

  /* Checking if the component has loaded and if it is not in edit mode. If
  both of these conditions are true, then it sets the hasLoaded state to
  true. */
  useEffect(() => {
    !hasLoaded && !edit && setHasLoaded(true);
  }, [coverImage, edit, hasLoaded]);

  /* Function that handles submitting altered post data to database. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the event. */
    const formData = collectFormData(event);

    /* Checking if the user has uploaded a new cover image. If they
    have, it will add the new image to the formData. */
    if (event?.target["cover_image"]?.files[0]) {
      formData.set("cover_image", event.target["cover_image"].files[0]);
    }

    try {
      /* If edit mode, update post, if not create it. */
      const { data } = edit
        ? await axiosReq.put(`posts/${id}/`, formData)
        : await axiosReq.post(`posts/create/`, formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      {/* Conditionally render content if response has loaded. */}
      {hasLoaded ? (
        <>
          <Form className="card" onSubmit={handleSubmit}>
            <Card.Header>
              {/* Cover image upload, only shows if image has been selected. */}
              <FormInput
                label="Cover Image"
                name="cover_image"
                type="file"
                errorData={errors?.cover_image}
                setPreview={setCoverImage}>
                {coverImage && (
                  <Card.Img
                    alt="Cover Image"
                    src={coverImage}
                    className={styles.CoverImage}
                  />
                )}
                <Form.Label className="btn btn-primary m-0 w-100">
                  <IconText
                    text={coverImage ? "Change Image" : "Upload a Cover Image"}
                    icon="upload"
                    left
                    right
                  />
                </Form.Label>
              </FormInput>
            </Card.Header>

            <Card.Body>
              {/* Form inputs, conditionally rendered as readonly if not in
              edit mode. */}
              <FormInput
                label="Title"
                name="title"
                errorData={errors?.title}
                text="*Please enter a title for your post."
                initialData={title}
                hr
              />

              {!edit && (
                <AdminButton
                  left
                  right
                  href="posts/category/"
                  text="Categories Admin Page"
                  hr
                />
              )}

              {/* Category select. */}
              <FormInput
                label="Category"
                name="category"
                type="select"
                errorData={errors?.category}
                text="*Please select your guides category."
                initialData={category}
                hr>
                <option value="">Choose Category</option>
                {/* Maps the categories into select options. */}
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </FormInput>

              <FormInput
                label="Your Guide"
                name="content"
                as="textarea"
                rows={14}
                errorData={errors?.content}
                text="*Please enter your guide here."
                initialData={content}
                hr
              />

              <FormInput
                label="Work In Progress"
                name="wip"
                type="check"
                errrorData={errors?.wip}
                text="Is this still a work in progress?"
                variant="secondary"
                initialData={wip}
                size={md && "lg"}
              />

              {/* Non-field form errors */}
              <FormError data={errors?.non_field_errors} />
            </Card.Body>

            <Card.Footer className="btn-group p-0">
              {/* Cancel button, goes back a page. */}
              <Button
                aria-label="Cancel"
                variant="danger"
                size={md && "lg"}
                onClick={() => navigate(-1)}>
                <IconText text={"Cancel"} icon="ban" left right />
              </Button>
              {/* Submit button, submits the form */}
              <Button
                aria-label={edit ? "Update" : "Create"}
                type="submit"
                size={md && "lg"}>
                <IconText
                  text={edit ? "Update" : "Create"}
                  icon={edit ? "floppy-disk" : "square-plus"}
                  left
                  right
                />
              </Button>
            </Card.Footer>
          </Form>
        </>
      ) : (
        <>
          {/* Conditionally rendered no results header if no resposne yet. */}
          <LoadingSpinner />
        </>
      )}
    </>
  );
};

export default PostCreateEditForm;
