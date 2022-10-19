import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import FormError from "../../components/FormError";
import AdminButton from "../../components/AdminButton";
import { useCurrentUser } from "../../contexts/currentUserContext";
import IconText from "../../components/IconText";

const ContactForm = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    reason: 0,
    content: "",
  });
  const { title, email, username, first_name, last_name, reason, content } =
    formData;

  useEffect(() => {
    setFormData((prevFormData) => {
      return { ...prevFormData, username: currentUser?.username };
    });
  }, [navigate, currentUser]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("contact-form/", formData);
      setFormSent(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      {formSent ? (
        <>
          <Card>
            <Card.Header>
              <h1>Submitted!</h1>
            </Card.Header>

            <Card.Body>
              <p className="my-1">
                Your message has been sent, and will be reviewed by our team
                shortly.
              </p>
            </Card.Body>

            <Card.Footer className="btn-group p-0">
              <Button variant="secondary" onClick={() => navigate(0)}>
                <IconText
                  text="Submit Another"
                  icon="square-plus"
                  left
                  right
                />
              </Button>
              <NavLink end to="/" className="btn btn-primary">
                <IconText text="Home" icon="home" left right />
              </NavLink>
            </Card.Footer>
          </Card>
        </>
      ) : (
        <>
          <Form className="card" onSubmit={handleSubmit}>
            <Card.Header>
              <h1>Contact Us</h1>
              {currentUser?.is_admin && (
                <AdminButton
                  leftIcon
                  rightIcon
                  href="admin/contactforms/contactform/"
                  text="Submitted Contact Forms"
                />
              )}
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
                  text="*Please provide a title for your message."
                />
                <hr />
              </Form.Group>

              <Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label className="d-none">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={first_name}
                      onChange={handleChange}
                      className="text-center"
                    />
                    <FormError
                      data={errors?.first_name}
                      text="(OPTIONAL) Please provide your first name."
                    />
                    <hr />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label className="d-none">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={last_name}
                      onChange={handleChange}
                      className="text-center"
                    />
                    <FormError
                      data={errors?.last_name}
                      text="(OPTIONAL) Please provide your last name."
                    />
                    <hr />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      className="text-center"
                    />
                    <FormError
                      data={errors?.username}
                      text="(OPTIONAL) Please enter your username."
                    />
                    <hr />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label className="d-none">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="text-center"
                    />
                    <FormError
                      data={errors?.email}
                      text="*Please enter your email address."
                    />
                    <hr />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label className="d-none">Reason For Contact</Form.Label>
                <Form.Select
                  className="text-center"
                  name="reason"
                  value={reason}
                  onChange={handleChange}>
                  <option value={0}>Support</option>
                  <option value={1}>Bug Report</option>
                  <option value={2}>Feedback</option>
                  <option value={3}>Compliment</option>
                  <option value={4}>Complaint</option>
                </Form.Select>
                <FormError
                  data={errors?.reason}
                  text="*Please select your reason for contacting us."
                />
                <hr />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-none">Contact Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="text"
                  placeholder="Your Message"
                  name="content"
                  value={content}
                  onChange={handleChange}
                  className="text-center"
                />
                <FormError
                  data={errors?.content}
                  text="*Please enter your message for our team."
                />
              </Form.Group>
              <FormError data={errors?.non_field_errors} />
            </Card.Body>

            <Card.Footer className="btn-group p-0">
              <Button onClick={() => navigate(0)} variant="danger">
                <IconText text="Clear" icon="trash" left right />
              </Button>
              <Button type="submit">
                <IconText text="Submit" icon="paper-plane" left right />
              </Button>
            </Card.Footer>
          </Form>
        </>
      )}
    </>
  );
};

export default ContactForm;
