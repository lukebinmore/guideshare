import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import { useSetAuthModal } from "./AuthModalContext";

/* Creating a context and a hook to use the context. */
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const setAuthModal = useSetAuthModal();
  const navigate = useNavigate();

  /* Function that gets the currently logged in user on mount, and saves the
  data to the context state. */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /* React memo that creates and sets the interceptors for responses 
  and requests. Redirects the user to the home page, and opens the auth
  modal on token expiry. */
  useMemo(() => {
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && shouldRefreshToken()) {
          try {
            await axios.post("auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/");
                setAuthModal({ show: true, page: "expired" });
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );

    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/");
                setAuthModal({ show: true, page: "expired" });
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }, [navigate, setAuthModal]);

  /* Returns the context providers. */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
