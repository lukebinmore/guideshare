import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetAuthModal } from "../contexts/AuthModalContext";

const useRedirect = (target) => {
  const navigate = useNavigate();
  const setAuthModal = useSetAuthModal();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("auth/token/refresh/");
      } catch (err) {
        switch (target) {
          case "members":
            navigate("/");
            setAuthModal({ show: true, page: "joinUs" });
            break;
          case "restricted":
            navigate("/restricted");
            break;
          default:
            break;
        }
      }
    };

    target !== "pass" && handleMount();
  }, [navigate, target, setAuthModal]);
};

export default useRedirect;
