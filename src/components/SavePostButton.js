import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useSavedFollowed,
  useSetSavedFollowed,
} from "../contexts/SavedFollowedContext";
import { axiosReq } from "../api/axiosDefaults";
import { AddRemoveArrayItem } from "../utils/utils";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import IconText from "./IconText";
import { useBreakpoints } from "../hooks";

const SavePostButton = ({ id }) => {
  const { saved_posts } = useSavedFollowed();
  const setSavedFollowed = useSetSavedFollowed();
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();

  const [postSaved, setPostSaved] = useState(false);

  useEffect(() => {
    saved_posts && setPostSaved(saved_posts.includes(parseInt(id)));
  }, [saved_posts, id]);

  const handleClick = async () => {
    const saveData = AddRemoveArrayItem(parseInt(id), saved_posts);

    try {
      await axiosReq.put(`/saved-following/${currentUser?.profile_id}`, {
        saved_posts: saveData,
      });
      setSavedFollowed((prevData) => ({
        ...prevData,
        saved_posts: saveData,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button variant={postSaved ? "secondary" : "primary"} onClick={handleClick}>
      <IconText
        text={md && (postSaved ? "Unsave" : "Save")}
        icon="save"
        right
      />
    </Button>
  );
};

export default SavePostButton;
