import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData, removeTokenTimestamp } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AdminButton from "../../components/AdminButton";
import Avatar from "../../components/Avatar";
import EditDeleteDropdown from "../../components/EditDeleteDropdown";
import FormInput from "../../components/FormInput";
import IconText from "../../components/IconText";
import PostsPage from "../posts//PostsPage";
import Profiles from "./Profiles";
import useBreakpoints from "../../hooks/useBreakpoints";
import styles from "../../styles/ProfilePage.module.css";

const ProfilePage = () => {
  /* destructuring the useParams, useBreakpoints, useNavigate, and
  useSetCurrentUser. */
  const { id } = useParams();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [subPage, setSubPage] = useState("posts");
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState();

  /* Destructuring the profile object. */
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

  /* Function to get profile based on id passed in props. */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${id}/`);
        setProfile(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id]);

  /* Function to handle deleting users own profile. */
  const handleDelete = async () => {
    try {
      /* Deletes profile, then logges user out, then redirects to home page. */
      await Promise.all([
        axiosReq.delete(`profiles/${id}/`),
        axios.post("auth/logout/"),
      ]);
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  /* Function to handle submitting updates to users own profile. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the event. */
    let formData = collectFormData(event);

    /* Checking if the user has uploaded a new profile picture. If they
    have, it will add the new picture to the formData. */
    if (event.target["picture"].files[0]) {
      formData.set("picture", event.target["picture"].files[0]);
    }

    try {
      /* Attemptes to update profile data with provided form data. */
      const { data } = await axiosReq.put(`profiles/${id}/`, formData);
      await axiosReq.put(`profiles/${id}/`, {
        following: following,
        saved_posts: saved_posts,
      });
      setProfile(data);
      setEdit(false);
    } catch (err) {
      /* Sets errors on unsuccessful put request. */
      setErrors(err?.response?.err);
    }
  };

  return (
    <>
      {/* Conditionally render page content if API call has returned data. */}
      {hasLoaded && (
        <>
          {/* Update form assigning appropriate submit function. */}
          <Form className="card mb-3" onSubmit={handleSubmit}>
            <Card.Header>
              {/* Conditionally renders content if edit state is true. */}
              {!edit && (
                <>
                  {/* Conditional renders content if current user is owner
                  of profile. */}
                  {is_owner && (
                    <>
                      {/* Renders edit and delete button dropdown. */}
                      <EditDeleteDropdown
                        opaque
                        handleEdit={() => setEdit(true)}
                        handleDelete={handleDelete}
                      />

                      {/* Renders admin button for admin users. */}
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
                {/* Profile Picture display, with props for edit. */}
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
                  {/* Conditional display of posts, followers and followed
                  profiles if edit state is false. */}
                  {!edit && (
                    <div className={styles.ProfileStats}>
                      <Button
                        aria-label="Posts"
                        variant="outline-primary"
                        onClick={() => setSubPage("posts")}>
                        <h2>{post_count}</h2>
                        <p>Posts</p>
                      </Button>

                      <Button
                        aria-label="Followers"
                        variant="outline-primary"
                        onClick={() => setSubPage("followers")}>
                        <h2>{followers_count}</h2>
                        <p>Followers</p>
                      </Button>

                      <Button
                        aria-label="Following"
                        variant="outline-primary"
                        onClick={() => setSubPage("following")}>
                        <h2>{following_count}</h2>
                        <p>Following</p>
                      </Button>
                    </div>
                  )}

                  {/* Conditionally renders first name if edit state is true or field has a value. */}
                  <Row xs={1} md={2} className={`g-2 ${styles.ProfileDetails}`}>
                    {(first_name || edit) && (
                      <Col>
                        <p className="text-muted">First Name</p>
                        <FormInput
                          name="first_name"
                          label="First Name"
                          errorData={errors?.first_name}
                          readOnly={!edit}
                          initialData={first_name}
                        />
                      </Col>
                    )}

                    {/* Conditionally renders last name if edit state is true or field has a value. */}
                    {(last_name || edit) && (
                      <Col>
                        <p className="text-muted">Last Name</p>
                        <FormInput
                          name="last_name"
                          label="Last Name"
                          errorData={errors?.last_name}
                          readOnly={!edit}
                          initialData={last_name}
                        />
                      </Col>
                    )}

                    {/* Conditionally renders dob if edit state is true or field has a value. */}
                    {(dob || edit) && (
                      <Col>
                        <p className="text-muted">Date of Birth</p>
                        <FormInput
                          name="dob"
                          type="date"
                          label="Date of Birth"
                          errorData={errors?.dob}
                          readOnly={!edit}
                          initialData={dob}
                        />
                      </Col>
                    )}

                    {/* Conditionally renders email if edit state is true or field has a value. */}
                    {(email || edit) && (
                      <Col>
                        <p className="text-muted">Email Address</p>
                        <FormInput
                          name="email"
                          label="Email Address"
                          errorData={errors?.email}
                          readOnly={!edit}
                          initialData={email}
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Card.Body>

            {/* Conditionally render user signup dates if edit state is
            false, submit and cancel buttons if true. */}
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
                <Button
                  aria-label="Cancel"
                  variant="danger"
                  onClick={() => setEdit(false)}>
                  <IconText text="Cancel" icon="ban" left right />
                </Button>
                <Button aria-label="Save" type="submit">
                  <IconText text="Save" icon="save" left right />
                </Button>
              </Card.Footer>
            )}
          </Form>

          {/* Conditionally renders subpage content if edit state is false. */}
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
