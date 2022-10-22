import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import { AdminButton } from "../../components/Buttons";
import FormInput from "../../components/FormInput";
import { collectFormData, fetchCategories } from "../../utils/utils";
import useBreakpoints from "../../hooks/useBreakpoints";
import styles from "../../styles/PostCreateEditForm.module.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const PostCreateEditForm = ({ edit }) => {
  const { id } = useParams();
  const { md } = useBreakpoints();
  const navigate = useNavigate();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState();
  const [post, setPost] = useState({});
  const { title, category, content, wip, is_owner } = post;
  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    fetchCategories(setCategories);
  }, [navigate]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        data.is_owner ? setPost(data) : navigate(-1);
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

  useEffect(() => {
    !hasLoaded && !edit && setHasLoaded(true);
  }, [coverImage, edit, hasLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

    if (event?.target["cover_image"]?.files[0]) {
      formData.set("cover_image", event.target["cover_image"].files[0]);
    }

    try {
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
      {hasLoaded ? (
        <>
          <Form className="card" onSubmit={handleSubmit}>
            <Card.Header>
              <FormInput
                label="Cover Image"
                name="cover_image"
                type="file"
                errorData={errors?.cover_image}
                setPreview={setCoverImage}>
                {coverImage && (
                  <Card.Img src={coverImage} className={styles.CoverImage} />
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
                  href="admin/posts/category/"
                  text="Categories Admin Page"
                  hr
                />
              )}

              <FormInput
                label="Category"
                name="category"
                type="select"
                errorData={errors?.category}
                text="*Please select your guides category."
                initialData={category}
                hr>
                <option value="">Choose Category</option>
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

              <FormError data={errors?.non_field_errors} />
            </Card.Body>

            <Card.Footer className="btn-group p-0">
              <Button
                variant="danger"
                size={md && "lg"}
                onClick={() => navigate(-1)}>
                <IconText text={"Cancel"} icon="ban" left right />
              </Button>
              <Button type="submit" size={md && "lg"}>
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
        <LoadingSpinner />
      )}
    </>
  );
};

export default PostCreateEditForm;
