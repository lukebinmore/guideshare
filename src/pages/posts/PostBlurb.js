import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonText from "../../components/ButtonText";
import styles from "../../styles/PostBlurb.module.css";

const PostBlurb = (props) => {
  const {
    id,
    title,
    category_title,
    cover_image,
    likes_count,
    dislikes_count,
  } = props;

  return (
    <Link to={`/posts/${id}`} className={`card mb-3 ${styles.PostBlurb}`}>
      <Card.Header className="p-2">
        <Card.Img src={cover_image} />
      </Card.Header>

      <Card.Body className="p-2">
        <h5>{title}</h5>
      </Card.Body>

      <Card.Footer className="px-4 py-2">
        <Row>
          <Col xs="auto" className={`p-0 ${styles.PostLikes}`}>
            <ButtonText text={likes_count} icon="thumbs-up" left />
          </Col>
          <Col className="text-center px-0 py-0">
            <h5>{category_title}</h5>
          </Col>
          <Col xs="auto" className={`p-0 ${styles.PostDislikes}`}>
            <ButtonText text={dislikes_count} icon="thumbs-down" right />
          </Col>
        </Row>
      </Card.Footer>
    </Link>
  );
};

export default PostBlurb;
