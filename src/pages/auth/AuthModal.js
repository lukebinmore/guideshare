import React from "react";
import { useAuthModal } from "../../contexts/authModalContext";
import JoinUs from "./JoinUs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import SignupProfileForm from "./SignupProfileForm";

const AuthModal = () => {
  const authModal = useAuthModal();

  switch (authModal.page) {
    case "login":
      return <LoginForm />;
    case "signup":
      return <SignupForm />;
    case "profile":
      return <SignupProfileForm />;
    case "expired":
      return <JoinUs expired />;
    default:
      return <JoinUs />;
  }
};

export default AuthModal;
