import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

/* Creating a context and a hook to use the context. */
export const SavedFollowedContext = createContext();
export const SetSavedFollowedContext = createContext();

export const useSavedFollowed = () => useContext(SavedFollowedContext);
export const useSetSavedFollowed = () => useContext(SetSavedFollowedContext);

export const SavedFollowedProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [savedFollowed, setSavedFollowed] = useState({});

  /* Function that gets the currently logged in users followed profiles
  and saved posts. */
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id) {
        try {
          const { data } = await axiosRes.get(
            `saved-following/${currentUser?.profile_id}/`
          );
          setSavedFollowed(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleMount();
  }, [currentUser]);

  /* Returns the context providers. */
  return (
    <SavedFollowedContext.Provider value={savedFollowed}>
      <SetSavedFollowedContext.Provider value={setSavedFollowed}>
        {children}
      </SetSavedFollowedContext.Provider>
    </SavedFollowedContext.Provider>
  );
};
