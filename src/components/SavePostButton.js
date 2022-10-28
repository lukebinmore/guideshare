import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import {
  useSavedFollowed,
  useSetSavedFollowed,
} from "../contexts/SavedFollowedContext";
import { AddRemoveArrayItem } from "../utils/utils";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";

const SavePostButton = ({ id }) => {
  /* Destructuring the useSavedFollowed, useSetSavedFollowed, useCurrentUser, and
  useBreakpoints hooks. */
  const { saved_posts } = useSavedFollowed();
  const setSavedFollowed = useSetSavedFollowed();
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();

  const [postSaved, setPostSaved] = useState(false);

  /* Setting the boolean based on if it exists in the saved array, run 
  when the array changes. */
  useEffect(() => {
    saved_posts && setPostSaved(saved_posts.includes(parseInt(id)));
  }, [saved_posts, id]);

  /* Function to handle clicks of the follow button. */
  const handleClick = async () => {
    /* Save new array of saved posts to const. */
    const saveData = AddRemoveArrayItem(parseInt(id), saved_posts);

    try {
      /* Attempt to update array in database. */
      await axiosReq.put(`saved-following/${currentUser?.profile_id}/`, {
        saved_posts: saveData,
      });
      /* Update local array. */
      setSavedFollowed((prevData) => ({
        ...prevData,
        saved_posts: saveData,
      }));
    } catch (err) {}
  };

  return (
    <>
      {/* Save button with conditional variant, label and text. */}
      <Button
        aria-label={postSaved ? "Unsave Post" : "Save Post"}
        variant={postSaved ? "secondary" : "primary"}
        onClick={handleClick}>
        <IconText
          text={md && (postSaved ? "Unsave" : "Save")}
          icon="save"
          right
        />
      </Button>
    </>
  );
};

export default SavePostButton;
