import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AdminButton from "../../components/AdminButton";
import EditDeleteDropdown from "../../components/EditDeleteDropdown";
import FollowProfileButton from "../../components/FollowProfileButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProfileButton from "../../components/ProfileButton";
import SavePostButton from "../../components/SavePostButton";
import VoteFooter from "../../components/VoteFooter";
import useBreakpoints from "../../hooks/useBreakpoints";
import styles from "../../styles/PostPage.module.css";
import appStyles from "../../App.module.css";
import Comments from "../comments/Comments";

const PostPage = () => {
  const { id } = useParams();
  const { sm, md } = useBreakpoints();
  const navigate = useNavigate();

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
    wip,
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
        const { data } = await axiosReq.get(`posts/${id}/`);
        setPost(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`posts/${id}/`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {hasLoaded ? (
        <>
          <Card className="mb-3">
            <Card.Header>
              {is_owner && (
                <EditDeleteDropdown
                  handleEdit={() => navigate(`/posts/edit/${id}`)}
                  handleDelete={handleDelete}
                />
              )}
              <Card.Img
                alt="Cover Image"
                src={cover_image}
                className={styles.CoverImage}
              />
            </Card.Header>

            <Card.Header className="d-flex justify-content-between align-items-center p-2">
              <div className={`text-end ${md && styles.HeaderButton}`}>
                {!is_owner && profile_id && <FollowProfileButton id={id} />}
              </div>
              <p className={`mx-2 ${appStyles.Title}`}>
                {wip && "(WIP) "}
                {title}
              </p>
              <div className={`text-end ${md && styles.HeaderButton}`}>
                <SavePostButton id={id} />
              </div>
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
                    username={profile_id ? owner : "Profile Deleted"}
                    profile_id={profile_id}
                    src={profile_picture}
                    horizontal
                    disabled={!profile_id}
                    unique
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

            <VoteFooter
              post_id={id}
              like_id={like_id}
              likes_count={likes_count}
              dislike_id={dislike_id}
              dislikes_count={dislikes_count}
              comments_count={comments_count}
            />
          </Card>
          <Comments id={id} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PostPage;
