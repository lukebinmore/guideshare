import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  AdminButton,
  Avatar,
  EditDeleteDropdown,
  FormInput,
  IconText,
} from "../../components";
import { useBreakpoints } from "../../hooks";
import PostsPage from "../posts//PostsPage";
import styles from "../../styles/ProfilePage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Profiles from "./Profiles";
import { collectFormData, removeTokenTimestamp } from "../../utils/utils";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";

const ProfilePage = () => {
  const { id } = useParams();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [subPage, setSubPage] = useState("posts");
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState();
  const [profile, setProfile] = useState({ results: [] });
  const {
    owner,
    is_owner,
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
    following,
    saved_posts,
  } = profile;
  const [profilePicture, setPicture] = useState(picture);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
        setHasLoaded(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id]);

  const handleDelete = async () => {
    try {
      await Promise.all([
        axiosReq.delete(`/profiles/${id}/`),
        axios.post("auth/logout/"),
      ]);
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

    if (event.target["picture"].files[0]) {
      formData.append("picture", event.target["picture"].files[0]);
    }

    console.log(...formData);
    for (var pair of formData) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, {
        ...formData,
        following: following,
        saved_posts: saved_posts,
      });
      setProfile(data);
      setEdit(false);
    } catch (err) {
      setErrors(err?.response?.err);
    }
  };

  return (
    <>
      {hasLoaded && (
        <>
          <Form className="card mb-3" onSubmit={handleSubmit}>
            <Card.Header>
              {!edit && (
                <>
                  {is_owner && (
                    <>
                      <EditDeleteDropdown
                        opaque
                        handleEdit={() => setEdit(true)}
                        handleDelete={handleDelete}
                      />

                      <AdminButton
                        text="Open Profile Admin"
                        href={`profiles/profile/${id}/change/`}
                        left
                        right
                      />
                    </>
                  )}
                </>
              )}
              <h1>{owner}'s Profile</h1>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col sm={4} className={!sm && `w-50 mx-auto`}>
                  <FormInput
                    label="Profile Picture"
                    name="picture"
                    type="file"
                    errorData={errors?.picture}
                    readOnly={!edit}
                    setPreview={setPicture}>
                    <Avatar src={profilePicture || picture} change={edit} />
                  </FormInput>
                </Col>
                <Col className="mt-2">
                  {!edit && (
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
                  )}

                  <Row xs={1} md={2} className={`g-2 ${styles.ProfileDetails}`}>
                    {(first_name || edit) && (
                      <Col>
                        <p className="text-muted">First Name</p>
                        <FormInput
                          name="first_name"
                          label="First Name"
                          readOnly={!edit}
                          initialData={first_name}
                        />
                      </Col>
                    )}

                    {(last_name || edit) && (
                      <Col>
                        <p className="text-muted">Last Name</p>
                        <FormInput
                          name="last_name"
                          label="Last Name"
                          readOnly={!edit}
                          initialData={last_name}
                        />
                      </Col>
                    )}

                    {(dob || edit) && (
                      <Col>
                        <p className="text-muted">Date of Birth</p>
                        <FormInput
                          name="dob"
                          label="Date of Birth"
                          readOnly={!edit}
                          initialData={dob}
                        />
                      </Col>
                    )}

                    {(email || edit) && (
                      <Col>
                        <p className="text-muted">Email Address</p>
                        <FormInput
                          name="email"
                          label="Email Address"
                          readOnly={!edit}
                          initialData={email}
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Card.Body>

            {!edit ? (
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
            ) : (
              <Card.Footer className="btn-group p-0">
                <Button variant="danger" onClick={() => setEdit(false)}>
                  <IconText text="Cancel" icon="ban" left right />
                </Button>
                <Button type="submit">
                  <IconText text="Save" icon="save" left right />
                </Button>
              </Card.Footer>
            )}
          </Form>

          {!edit && (
            <>
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
      )}
    </>
  );
};

export default ProfilePage;
