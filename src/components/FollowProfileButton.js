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

const FollowProfileButton = ({ id }) => {
  const { following } = useSavedFollowed();
  const setSavedFollowed = useSetSavedFollowed();
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();

  const [profileFollowed, setProfileFollowed] = useState(false);

  useEffect(() => {
    setProfileFollowed(following.includes(parseInt(id)));
  }, [following, id]);

  const handleClick = async () => {
    const profileData = AddRemoveArrayItem(parseInt(id), following);

    try {
      await axiosReq.put(`/saved-following/${currentUser?.profile_id}`, {
        following: profileData,
      });
      setSavedFollowed((prevData) => ({
        ...prevData,
        following: profileData,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      variant={profileFollowed ? "secondary" : "primary"}
      onClick={handleClick}>
      <IconText
        text={md && (profileFollowed ? "Unfollow" : "Follow")}
        icon="rss"
        left
      />
    </Button>
  );
};

export default FollowProfileButton;
