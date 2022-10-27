import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import IconText from "../../components/IconText";
import NavButton from "../../components/NavButton";
import oops from "../../assets/oops.png";

const errors = {
  404: {
    title: "Page Not Found",
    text: "This page doesn't seem to exist...",
    image: oops,
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
        <Image src={image} className="w-75" />
      </Card.Body>

      <Card.Footer className="btn-group w-100">
        <Button onClick={() => navigate(-1)}>
          <IconText text="Back" icon="backward" left right />
        </Button>
        <NavButton to="home" left right />
      </Card.Footer>
    </Card>
  );
};

export default ErrorPage;
