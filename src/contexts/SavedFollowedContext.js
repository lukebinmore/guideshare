import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const SavedFollowedContext = createContext();
export const SetSavedFollowedContext = createContext();

export const useSavedFollowed = () => useContext(SavedFollowedContext);
export const useSetSavedFollowed = () => useContext(SetSavedFollowedContext);

export const SavedFollowedProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [savedFollowed, setSavedFollowed] = useState({});

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

  return (
    <SavedFollowedContext.Provider value={savedFollowed}>
      <SetSavedFollowedContext.Provider value={setSavedFollowed}>
        {children}
      </SetSavedFollowedContext.Provider>
    </SavedFollowedContext.Provider>
  );
};
