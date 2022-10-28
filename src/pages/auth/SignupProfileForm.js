import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router";
import { useAuthModal, useSetAuthModal } from "../../contexts/AuthModalContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { collectFormData } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AuthButton from "../../components/AuthButton";
import Avatar from "../../components/Avatar";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import IconText from "../../components/IconText";
import useBreakpoints from "../../hooks/useBreakpoints";

const SignupProfileForm = () => {
  /* Importing the useAuthModal, useSetAuthModal, useCurrentUser, useBreakpoints,
  and useNavigate hooks. */
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const currentUser = useCurrentUser();
  const { sm } = useBreakpoints();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState();

  /* Function that handles submission of form data to API. */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Collecting the form data from the event. */
    const formData = collectFormData(event);

    /* Checking if the user has uploaded a picture. If they have, it will
    add the picture to the form data. */
    if (event.target["picture"].files[0])
      formData.set("picture", event.target["picture"].files[0]);

    try {
      // Attempts to submmit form data to API.
      await axiosReq.put(`profiles/${currentUser.profile_id}/`, formData);
      setAuthModal({ show: false });
      navigate(0);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Modal show={authModal.show} onHide={() => setAuthModal({ show: false })}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Create Your Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormInput
            label="Profile Picture"
            type="file"
            name="picture"
            errorData={errors?.picture}
            text="(OPTIONAL) Upload a profile picture."
            setPreview={setPicture}
            hr>
            <Avatar change src={picture} />
          </FormInput>

          <FormInput
            label="First Name"
            name="first_name"
            errorData={errors?.first_name}
            text="(OPTIONAL) Enter your first name."
            hr
          />

          <FormInput
            label="Last Name"
            name="last_name"
            errorData={errors?.last_name}
            text="(OPTIONAL) Enter your last name."
            hr
          />

          <FormInput
            type="date"
            label="Date Of Birth"
            name="dob"
            errorData={errors?.dob}
            text="(OPTIONAL) Enter your date of birth."
            hr
          />

          <FormInput
            label="Email Address"
            name="email"
            errorData={errors?.email}
            text="(OPTIONAL) Enter your email address."
          />

          <FormError data={errors?.non_field_errors} />
        </Modal.Body>

        <Modal.Footer>
          <Button
            aria-label="Save Profile"
            type="submit"
            className="w-75"
            size={sm && "lg"}>
            <IconText text="Save Profile" icon="floppy-disk" left right />
          </Button>
          <p>Don't feel like doing this yet?</p>
          <AuthButton page="later" size="sm" variant="secondary" left refresh />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SignupProfileForm;
