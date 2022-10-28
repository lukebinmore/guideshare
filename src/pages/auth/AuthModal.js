import React from "react";
import { useAuthModal } from "../../contexts/AuthModalContext";
import ChangePasswordForm from "./ChangePasswordForm";
import JoinUs from "./JoinUs";
import LoginForm from "./LoginForm";
import SignoutForm from "./SignoutForm";
import SignupForm from "./SignupForm";
import SignupProfileForm from "./SignupProfileForm";
import UserExpired from "./UserExpired";

const AuthModal = () => {
  const authModal = useAuthModal();

  /* Checks the value of authModal.page and returns the appropriate 
  component. */
  switch (authModal.page) {
    case "login":
      return <LoginForm />;
    case "signout":
      return <SignoutForm />;
    case "signup":
      return <SignupForm />;
    case "profile":
      return <SignupProfileForm />;
    case "changePassword":
      return <ChangePasswordForm />;
    case "expired":
      return <UserExpired />;
    default:
      return <JoinUs />;
  }
};

export default AuthModal;
