import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetAuthModal } from "../contexts/AuthModalContext";

const useRedirect = (target) => {
  /* Using the react-router-dom hook useNavigate() and the custom hook
  useSetAuthModal() */
  const navigate = useNavigate();
  const setAuthModal = useSetAuthModal();

  /* Function that attempts a token refresh on page change, to see if the user
  is logged in. Redirects to appripriate page if not. */
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
