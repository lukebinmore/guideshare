import React from "react";
import { useAuthModal } from "../../contexts/AuthModalContext";
import ChangePasswordForm from "./ChangePasswordForm";
import JoinUs from "./JoinUs";
import LoginForm from "./LoginForm";
import SignoutForm from "./SignoutForm";
import SignupForm from "./SignupForm";
import SignupProfileForm from "./SignupProfileForm";

const AuthModal = () => {
  const authModal = useAuthModal();

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
      return <JoinUs expired />;
    default:
      return <JoinUs />;
  }
};

export default AuthModal;
