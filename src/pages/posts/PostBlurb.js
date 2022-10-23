import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconText } from "../../components";
import styles from "../../styles/PostBlurb.module.css";

const PostBlurb = (props) => {
  const {
    id,
    title,
    category_title,
    cover_image,
    wip,
    likes_count,
    dislikes_count,
  } = props;

  return (
    <div className={`d-inline-block m-2 ${styles.PostBlurb}`}>
      <Link to={`/posts/${id}`}>
        <Card>
          <Card.Header className={`p-2 ${styles.PostHeader}`}>
            <Card.Img src={cover_image} />
          </Card.Header>

          <Card.Body className="p-2">
            <h5>
              {wip && "(WIP) "}
              {title}
            </h5>
          </Card.Body>

          <Card.Footer className="px-4 py-2">
            <Row>
              <Col xs="auto" className={`p-0 ${styles.PostDislikes}`}>
                <IconText text={dislikes_count} icon="thumbs-down" left />
              </Col>
              <Col className="text-center px-1 py-0">
                <h5>{category_title}</h5>
              </Col>
              <Col xs="auto" className={`p-0 ${styles.PostLikes}`}>
                <IconText text={likes_count} icon="thumbs-up" right />
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Link>
    </div>
  );
};

export default PostBlurb;
