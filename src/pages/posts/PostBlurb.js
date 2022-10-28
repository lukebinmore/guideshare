import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconText from "../../components/IconText";
import styles from "../../styles/PostBlurb.module.css";
import appStyles from "../../App.module.css";

const PostBlurb = (props) => {
  /* Destructuring the props object. */
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
      {/* Card wrapped in link to post. */}
      <Link to={`/posts/${id}`} aria-label={`Open Post ${title}`}>
        <Card>
          {/* Cover image in card header. */}
          <Card.Header className={`p-2 ${styles.PostHeader}`}>
            <Card.Img alt="Cover Image" src={cover_image} />
          </Card.Header>

          <Card.Body className="p-2">
            <p className={appStyles.Title}>
              {/* Conditionally rendered WIP for work in progress posts. */}
              {wip && "(WIP) "}
              {title}
            </p>
          </Card.Body>

          <Card.Footer className="px-4 py-2">
            <Row>
              {/* Dislikes count */}
              <Col xs="auto" className={`p-0 ${styles.PostDislikes}`}>
                <IconText text={dislikes_count} icon="thumbs-down" left />
              </Col>
              {/* Category */}
              <Col className="text-center px-1 py-0">
                <p>{category_title}</p>
              </Col>
              {/* Likes count */}
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
