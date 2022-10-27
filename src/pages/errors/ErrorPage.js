import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import IconText from "../../components/IconText";
import NavButton from "../../components/NavButton";
import oops from "../../assets/oops.png";
import restricted from "../../assets/restricted.png";

const errors = {
  404: {
    title: "Page Not Found",
    text: "This page doesn't seem to exist...",
    image: oops,
  },
  401: {
    title: "Restricted",
    text: "You are not authorized to view this page!",
    image: restricted,
  },
};

const ErrorPage = ({ target }) => {
  const navigate = useNavigate();

  const page = errors[target];
  const { title, text, image } = page;

  return (
    <Card>
      <Card.Header>
        <h1>
          <IconText text={title} icon="face-sad-tear" left right />
        </h1>
      </Card.Header>

      <Card.Body>
        <p>{text}</p>
      </Card.Body>

      <Card.Body>
        <Image alt="Error Image" src={image} className="w-50" />
      </Card.Body>

      <Card.Footer className="btn-group w-100">
        <Button aria-label="Go Back" onClick={() => navigate(-1)}>
          <IconText text="Back" icon="backward" left right />
        </Button>
        <NavButton to="home" left right />
      </Card.Footer>
    </Card>
  );
};

export default ErrorPage;
