import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import {
  useSavedFollowed,
  useSetSavedFollowed,
} from "../contexts/SavedFollowedContext";
import { AddRemoveArrayItem } from "../utils/utils";
import Button from "react-bootstrap/Button";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";

const FollowProfileButton = ({ id }) => {
  const { following } = useSavedFollowed();
  const setSavedFollowed = useSetSavedFollowed();
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();

  const [profileFollowed, setProfileFollowed] = useState(false);

  useEffect(() => {
    following && setProfileFollowed(following.includes(parseInt(id)));
  }, [following, id]);

  const handleClick = async () => {
    const profileData = AddRemoveArrayItem(parseInt(id), following);

    try {
      await axiosReq.put(`saved-following/${currentUser?.profile_id}/`, {
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
      onClick={handleClick}
      className="text-nowrap">
      <IconText
        text={md && (profileFollowed ? "Unfollow" : "Follow")}
        icon="rss"
        left
      />
    </Button>
  );
};

export default FollowProfileButton;
