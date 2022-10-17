import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import FormError from "../../components/FormError";
import { useCurrentUser } from "../../contexts/currentUserContext";

const ContactUs = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    reason: 0,
    content: "",
  });
  const { title, email, username, first_name, last_name, reason, content } =
    formData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentUser) {
      setFormData({
        ...formData,
        username: currentUser.username,
      });
    }

    setFormData({
      ...formData,
      reason: event.target["reason"].value,
    });

    try {
      await axios.post("contact-form/", formData);
      setFormSent(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Container className="my-3">
        {formSent ? (
          <>
            <h1>Thanks, our team will read this shortly!</h1>
          </>
        ) : (
          <>
            <Form className="card" onSubmit={handleSubmit}>
              <Card.Header>
                <h1 className="text-center">Contact Us</h1>
              </Card.Header>

              <Card.Body>
                <Form.Group className="text-center">
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
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="my-3 text-center">
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
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="my-3 text-center">
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
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {!currentUser && (
                    <Col>
                      <Form.Group className="my-3 text-center">
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
                      </Form.Group>
                    </Col>
                  )}

                  <Col>
                    <Form.Group className="my-3 text-center">
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
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="my-3 text-center">
                  <Form.Select
                    className="text-center"
                    name="reason"
                    onChange={handleChange}>
                    <option value="0">Support</option>
                    <option value="1">Bug Report</option>
                    <option value="2">Feedback</option>
                    <option value="3">Compliment</option>
                    <option value="4">Complaint</option>
                  </Form.Select>
                  <FormError
                    data={errors?.reason}
                    text="*Please select your reason for contacting us."
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-4 text-center">
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
                    data={errors.content}
                    text="*Please enter your message for our team."
                  />
                </Form.Group>
                <FormError data={errors?.non_field_errors} />
              </Card.Body>

              <Card.Footer className="btn-group p-0">
                <Button onClick={() => navigate(0)} variant="danger">
                  <i className="fa-solid fa-trash" /> Clear{" "}
                  <i className="fa-solid fa-trash" />
                </Button>
                <Button type="submit">
                  <i className="fa-solid fa-paper-plane" /> Submit{" "}
                  <i className="fa-solid fa-paper-plane" />
                </Button>
              </Card.Footer>
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default ContactUs;
