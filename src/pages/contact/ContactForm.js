import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  IconText,
  FormError,
  FormInput,
  AdminButton,
  NavButton,
} from "../../components";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData } from "../../utils/utils";
import { useBreakpoints } from "../../hooks";

const ContactForm = () => {
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();
  const navigate = useNavigate();

  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

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
                <IconText text="Submit Another" icon="square-plus" left right />
              </Button>
              <NavButton to="home" left right />
            </Card.Footer>
          </Card>
        </>
      ) : (
        <>
          <Form className="card" onSubmit={handleSubmit}>
            <Card.Header>
              <h1>Contact Us</h1>
              <AdminButton
                left
                right
                href="contactforms/contactform/"
                text="Submitted Contact Forms"
              />
            </Card.Header>

            <Card.Body>
              <FormInput
                label="Title"
                name="title"
                errorData={errors?.title}
                text="*Please enter a title for your message"
                hr
              />

              <Row>
                <Col md>
                  <FormInput
                    label="First Name"
                    name="first_name"
                    errorData={errors?.first_name}
                    text="(OPTIONAL) Please enter your first name."
                    hr
                  />
                </Col>

                <Col md>
                  <FormInput
                    label="Last Name"
                    name="last_name"
                    errorData={errors?.last_name}
                    text="(OPTIONAL) Please enter your last name."
                    hr
                  />
                </Col>
              </Row>

              <Row>
                <Col md>
                  <FormInput
                    label="Username"
                    name="username"
                    errorData={errors?.username}
                    text="(OPTIONAL) Please enter your username."
                    initialData={currentUser?.username}
                    hr
                  />
                </Col>

                <Col md>
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    errorData={errors?.email}
                    text="*Please enter your email address."
                    hr
                  />
                </Col>
              </Row>

              <FormInput
                label="Reason For Contact"
                type="select"
                name="reason"
                errorData={errors?.reason}
                text="*Please select your reason for contacting us."
                hr>
                <option value={0}>Support</option>
                <option value={1}>Bug Report</option>
                <option value={2}>Feedback</option>
                <option value={3}>Compliment</option>
                <option value={4}>Complaint</option>
              </FormInput>

              <FormInput
                label="Your Message"
                as="textarea"
                rows={5}
                name="content"
                errorData={errors?.content}
                text="*Please enter your message for our team."
                hr
              />
              <FormError data={errors?.non_field_errors} />
            </Card.Body>

            <Card.Footer className="btn-group p-0">
              <Button
                onClick={() => navigate(0)}
                variant="danger"
                size={md && "lg"}>
                <IconText text="Clear" icon="trash" left right />
              </Button>
              <Button type="submit" size={md && "lg"}>
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
