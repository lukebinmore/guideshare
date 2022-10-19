import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import FormError from "../../components/FormError";
import { AdminButton } from "../../components/Buttons";
import { useCurrentUser } from "../../contexts/currentUserContext";
import IconText from "../../components/IconText";
import FormInput from "../../components/FormInput";
import { collectFormData } from "../../utils/utils";

const ContactForm = () => {
  const currentUser = useCurrentUser();
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
              <AdminButton
                left
                right
                href="admin/contactforms/contactform/"
                text="Submitted Contact Forms"
              />
            </Card.Header>

            <Card.Body>
              <FormInput
                placeholder="Title"
                name="title"
                errorData={errors?.title}
                text="*Please enter a title for your message"
                hr
              />

              <Row>
                <Col md>
                  <FormInput
                    placeholder="First Name"
                    name="first_name"
                    errorData={errors?.first_name}
                    text="(OPTIONAL) Please enter your first name."
                    hr
                  />
                </Col>

                <Col md>
                  <FormInput
                    placeholder="Last Name"
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
                    placeholder="Username"
                    name="username"
                    errorData={errors?.username}
                    text="(OPTIONAL) Please enter your username."
                    initialValue={currentUser?.username}
                    hr
                  />
                </Col>

                <Col md>
                  <FormInput
                    placeholder="Email"
                    name="email"
                    type="email"
                    errorData={errors?.email}
                    text="*Please enter your email address."
                    hr
                  />
                </Col>
              </Row>

              <FormInput
                placeholder="Reason For Contact"
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
                placeholder="Your Message"
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
