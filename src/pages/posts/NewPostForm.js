import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/currentUserContext";
import ButtonText from "../../components/ButtonText";
import FormError from "../../components/FormError";
import AdminButton from "../../components/AdminButton";

const NewPostForm = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    cover_image: "",
    wip: false,
  });
  const { title, category, content, cover_image, wip } = formData;
  const imageInput = useRef(null);

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(cover_image);
      setFormData({
        ...formData,
        cover_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allFormData = new FormData();

    Object.keys(formData).map((key) => {
      return allFormData.append(key, formData[key]);
    });

    if (cover_image) {
      allFormData.set("cover_image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post(`posts/create/`, allFormData);
      navigate(`posts/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Form className="card" onSubmit={handleSubmit}>
        <Card.Header className="p-0">
          <Form.Group>
            {cover_image && <Card.Img src={cover_image} />}
            <Form.Label
              htmlFor="image-upload"
              className="btn btn-primary m-0 w-100">
              <ButtonText
                text={cover_image ? "Change Image" : "Upload a Cover Image"}
                icon="upload"
                left
                right
              />
            </Form.Label>
            <Form.Control
              className="d-none"
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
            />
            <FormError data={errors?.cover_image} />
          </Form.Group>
        </Card.Header>

        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label className="d-none">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
              className="text-center"
            />
            <FormError
              data={errors?.title}
              text="*Please provide a title for your post."
            />
            <hr />
          </Form.Group>

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

          <Form.Group>
            <Form.Label className="d-none">Category</Form.Label>
            <Form.Select
              className="text-center"
              name="category"
              value={category}
              onChange={handleChange}>
              <option value="">Choose Category</option>
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </Form.Select>
            <FormError
              data={errors?.category}
              text="*Please select your reason for contacting us."
            />
            <hr />
          </Form.Group>

          <Form.Group>
            <Form.Label className="d-none">Post Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              placeholder="Your Guide"
              name="content"
              value={content}
              onChange={handleChange}
              className="text-center"
            />
            <FormError
              data={errors?.content}
              text="*Please enter your guide here."
            />
            <hr />
          </Form.Group>

          <Form.Group>
            <Form.Label className="d-none">Work In Progress</Form.Label>
            <Button
              size="lg"
              variant="secondary"
              className="d-block mx-auto"
              onClick={() => setFormData({ ...formData, wip: !wip })}>
              <ButtonText
                text="Work In Progress"
                icon={wip ? "square-check" : "square"}
                left
                right
              />
            </Button>
            <FormError
              data={errors?.content}
              text="Is this still a work in progress?"
            />
          </Form.Group>

          <FormError data={errors?.non_field_errors} />
        </Card.Body>

        <Card.Footer className="btn-group p-0">
          <Button variant="danger" onClick={() => navigate(0)}>
            <ButtonText text="Clear" icon="trash" left right />
          </Button>
          <Button type="submit">
            <ButtonText text="Create" icon="square-plus" left right />
          </Button>
        </Card.Footer>
      </Form>
    </>
  );
};

export default NewPostForm;
