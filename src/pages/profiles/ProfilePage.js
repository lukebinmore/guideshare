import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { AdminButton, Avatar, FormInput } from "../../components";
import { useBreakpoints } from "../../hooks";
import PostsPage from "../posts//PostsPage";
import styles from "../../styles/ProfilePage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Profiles from "./Profiles";

const ProfilePage = () => {
  const { id } = useParams();
  const { sm } = useBreakpoints();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [subPage, setSubPage] = useState("posts");
  const [profile, setProfile] = useState({ results: [] });
  const {
    owner,
    first_name,
    last_name,
    dob,
    email,
    picture,
    post_count,
    following_count,
    followers_count,
    created_at,
    updated_at,
  } = profile;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
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
      {hasLoaded && (
        <>
          <Card className="mb-3">
            <Card.Header>
              <AdminButton
                text="Open Profile Admin"
                href={`profiles/profile/${id}/change/`}
                left
                right
              />
              <h1>{owner}'s Profile</h1>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col sm={4} className={!sm && `w-50 mx-auto`}>
                  <Avatar src={picture} />
                </Col>
                <Col className="mt-2">
                  <div className={styles.ProfileStats}>
                    <Button
                      variant="outline-primary"
                      onClick={() => setSubPage("posts")}>
                      <h2>{post_count}</h2>
                      <p>Posts</p>
                    </Button>

                    <Button
                      variant="outline-primary"
                      onClick={() => setSubPage("followers")}>
                      <h2>{followers_count}</h2>
                      <p>Followers</p>
                    </Button>

                    <Button
                      variant="outline-primary"
                      onClick={() => setSubPage("following")}>
                      <h2>{following_count}</h2>
                      <p>Following</p>
                    </Button>
                  </div>

                  <Row xs={1} md={2} className={`g-2 ${styles.ProfileDetails}`}>
                    {first_name && (
                      <Col>
                        <p className="text-muted">First Name</p>
                        <FormInput
                          name="first_name"
                          label="First Name"
                          readOnly
                          initialData={first_name}
                        />
                      </Col>
                    )}

                    {last_name && (
                      <Col>
                        <p className="text-muted">Last Name</p>
                        <FormInput
                          name="last_name"
                          label="Last Name"
                          readOnly
                          initialData={last_name}
                        />
                      </Col>
                    )}

                    {dob && (
                      <Col>
                        <p className="text-muted">Date of Birth</p>
                        <FormInput
                          name="dob"
                          label="Date of Birth"
                          readOnly
                          initialData={dob}
                        />
                      </Col>
                    )}

                    {email && (
                      <Col>
                        <p className="text-muted">Email Address</p>
                        <FormInput
                          name="email"
                          label="Email Address"
                          readOnly
                          initialData={email}
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer>
              <Row xs={1} sm={2} className="my-2">
                <Col className="d-flex align-items-center">
                  <p className="text-muted m-0">User Since: {created_at}</p>
                </Col>
                {!sm && <hr className="mt-3" />}
                <Col className="d-flex justify-content-end text-end">
                  <p className="text-muted m-0">Updated: {updated_at}</p>
                </Col>
              </Row>
            </Card.Footer>
          </Card>

          {subPage === "posts" ? (
            <Profiles title="Popular Profiles" />
          ) : subPage === "followers" ? (
            <Profiles
              title={`${owner}'s Followers`}
              filter={`following=${id}`}
            />
          ) : (
            subPage === "following" && (
              <Profiles
                title={`${owner} is Following`}
                filter={`followers=${id}`}
              />
            )
          )}
          <PostsPage pageFilter={`owner=${id}`} />
        </>
      )}
    </>
  );
};

export default ProfilePage;
