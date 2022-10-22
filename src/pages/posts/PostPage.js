import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { LoadingSpinner, AdminButton, ProfileButton } from "../../components";
import { useBreakpoints } from "../../hooks";
import styles from "../../styles/PostPage.module.css";

const PostPage = () => {
  const { id } = useParams();
  const { sm } = useBreakpoints();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [post, setPost] = useState({});
  const {
    owner,
    profile_id,
    profile_picture,
    title,
    category_title,
    content,
    cover_image,
    updated_at,
    is_owner,
    likes_count,
    like_id,
    dislikes_count,
    dislike_id,
    comments_count,
  } = post;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        setPost(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id]);

  return (
    <>
      {hasLoaded ? (
        <Card>
          <Card.Header>
            <Card.Img src={cover_image} className={styles.CoverImage} />
          </Card.Header>

          <Card.Header className="d-flex justify-content-center align-items-center">
            <h3 className="mx-2">{title}</h3>
          </Card.Header>

          <Card.Body className="p-2">
            <AdminButton
              href={`posts/post/${id}/change/`}
              text="Open Post in Admin Panel"
              left
              right
              hr
            />

            <Row xs={1} sm={2} className="my-2">
              <Col className="d-flex align-items-center">
                <ProfileButton
                  username={owner}
                  profile_id={profile_id}
                  src={profile_picture}
                  small
                />
              </Col>
              {!sm && <hr className="mt-3" />}
              <Col className="d-flex justify-content-end text-end">
                <div>
                  <p className="text-muted m-0">Updated: {updated_at}</p>
                  <p className="text-muted m-0">Category: {category_title}</p>
                </div>
              </Col>
            </Row>

            <hr />

            <p>{content}</p>
          </Card.Body>

          <Card.Footer></Card.Footer>
        </Card>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PostPage;
