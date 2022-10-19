import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/currentUserContext";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import { AdminButton } from "../../components/Buttons";
import FormInput from "../../components/FormInput";
import { collectFormData } from "../../utils/utils";

const NewPostForm = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState();
  const [cover_image, setCoverImage] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("posts/categories");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

    if (event?.target["cover_image"]?.files[0]) {
      formData.set("cover_image", event.target["cover_image"].files[0]);
    }

    try {
      const { data } = await axiosReq.post(`posts/create/`, formData);
      navigate(`posts/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Form className="card" onSubmit={handleSubmit}>
        <Card.Header className="p-0">
          <FormInput
            placeholder="Cover Image"
            name="cover_image"
            type="file"
            errorData={errors?.cover_image}
            setPreview={setCoverImage}>
            {cover_image && <Card.Img src={cover_image} />}
            <Form.Label className="btn btn-primary m-0 w-100">
              <IconText
                text={cover_image ? "Change Image" : "Upload a Cover Image"}
                icon="upload"
                left
                right
              />
            </Form.Label>
          </FormInput>
        </Card.Header>

        <Card.Body>
          <FormInput
            placeholder="Title"
            name="title"
            errorData={errors?.title}
            text="*Please enter a title for your post."
            hr
          />

          {currentUser?.is_admin && (
            <>
              <AdminButton
                leftIcon
                rightIcon
                href="admin/posts/category/"
                text="Categories Admin Page"
              />
              <hr />
            </>
          )}

          <FormInput
            placeholder="Category"
            name="category"
            type="select"
            errorData={errors?.category}
            text="*Please select your guides category."
            hr>
            <option value="">Choose Category</option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </FormInput>

          <FormInput
            placeholder="Your Guide"
            name="content"
            as="textarea"
            rows={14}
            errorData={errors?.content}
            text="*Please enter your guide here."
            hr
          />

          <FormInput
            placeholder="Work In Progress"
            name="wip"
            type="check"
            errrorData={errors?.wip}
            text="Is this still a work in progress?"
            variant="secondary"
            size="lg"
          />

          <FormError data={errors?.non_field_errors} />
        </Card.Body>

        <Card.Footer className="btn-group p-0">
          <Button variant="danger" onClick={() => navigate(0)}>
            <IconText text="Clear" icon="trash" left right />
          </Button>
          <Button type="submit">
            <IconText text="Create" icon="square-plus" left right />
          </Button>
        </Card.Footer>
      </Form>
    </>
  );
};

export default NewPostForm;
