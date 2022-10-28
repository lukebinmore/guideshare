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
  /* Destructuring the useParams, useBreakpoints, and useNavigate hooks. */
  const { id } = useParams();
  const { sm, md } = useBreakpoints();
  const navigate = useNavigate();

  /* Destructuring the useState hook. */
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

  /* Function to get post data using id prop. */
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

  /* Function to handle deletion of post. */
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
      {/* Conditionally render content if API has response. */}
      {hasLoaded ? (
        <>
          <Card className="mb-3">
            <Card.Header>
              {/* Conditionally render EditDeleteDropdown if post owner. */}
              {is_owner && (
                <EditDeleteDropdown
                  handleEdit={() => navigate(`/posts/edit/${id}`)}
                  handleDelete={handleDelete}
                />
              )}
              {/* Post cover image. */}
              <Card.Img
                alt="Cover Image"
                src={cover_image}
                className={styles.CoverImage}
              />
            </Card.Header>

            <Card.Header className="d-flex justify-content-between align-items-center p-2">
              <div className={`text-end ${md && styles.HeaderButton}`}>
                {/* Conditionally render Follow button if not post owner and
                profile still exists. */}
                {!is_owner && profile_id && <FollowProfileButton id={id} />}
              </div>
              <p className={`mx-2 ${appStyles.Title}`}>
                {/* Conditionally add WIP status to header. */}
                {wip && "(WIP) "}
                {title}
              </p>
              <div className={`text-end ${md && styles.HeaderButton}`}>
                <SavePostButton id={id} />
              </div>
            </Card.Header>

            <Card.Body className="p-2">
              {/* Conditionally rendered admin button rendered only for
              admin users. */}
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

            {/* Vote footer provided with relevent props to allow liking and
            disliking post. */}
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
        <>
          {/* Conditionally rendered loading header if no API response yet. */}
          <LoadingSpinner />
        </>
      )}
    </>
  );
};

export default PostPage;
