import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import IconText from "../../components/IconText";
import FormError from "../../components/FormError";
import FormInput from "../../components/FormInput";
import { useAuthModal, useSetAuthModal } from "../../contexts/authModalContext";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { collectFormData } from "../../utils/utils";
import { AuthButton } from "../../components/Buttons";

const SignupProfileForm = () => {
  const authModal = useAuthModal();
  const setAuthModal = useSetAuthModal();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = collectFormData(event);

    if (event.target["picture"].files[0])
      formData.set("picture", event.target["picture"].files[0]);

    try {
      await axiosReq.put(`profiles/${currentUser.profile_id}`, formData);
      setAuthModal({ show: false });
      navigate(0);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Modal
        show={authModal.show}
        onHide={() => setAuthModal({ show: false })}
        backdrop="static"
        keyboard={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Create Your Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormInput
              placeholder="Profile Picture"
              type="file"
              name="picture"
              errorData={errors?.picture}
              text="(OPTIONAL) Upload a profile picture."
              setPreview={setPicture}
              hr>
              <Avatar change src={picture} />
            </FormInput>
            <FormInput
              placeholder="First Name"
              name="first_name"
              errorData={errors?.first_name}
              text="(OPTIONAL) Enter your first name."
              hr
            />
            <FormInput
              placeholder="Last Name"
              name="last_name"
              errorData={errors?.last_name}
              text="(OPTIONAL) Enter your last name."
              hr
            />
            <FormInput
              placeholder="Date Of Birth"
              name="dob"
              errorData={errors?.dob}
              text="(OPTIONAL) Enter your date of birth."
            />
            <FormError data={errors?.non_field_errors} />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" className="w-75" size="lg">
              <IconText text="Save Profile" icon="floppy-disk" left right />
            </Button>
            <p>Don't feel like doing this yet?</p>
            <AuthButton
              page="later"
              size="sm"
              variant="secondary"
              left
              refresh
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignupProfileForm;
