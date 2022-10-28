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
  /* Destructuring the following from the useSavedFollowed hook, setting the
  setSavedFollowed hook, setting the currentUser hook, and setting the md
  breakpoint. */
  const { following } = useSavedFollowed();
  const setSavedFollowed = useSetSavedFollowed();
  const currentUser = useCurrentUser();
  const { md } = useBreakpoints();

  const [profileFollowed, setProfileFollowed] = useState(false);

  /* Checking if the following array is empty and if it is not empty, it is
  checking if the id is in the following array. */
  useEffect(() => {
    following && setProfileFollowed(following.includes(parseInt(id)));
  }, [following, id]);

  const handleClick = async () => {
    /* Save new array of followed profiles to const. */
    const profileData = AddRemoveArrayItem(parseInt(id), following);

    try {
      /* Attempt to update array in database. */
      await axiosReq.put(`saved-following/${currentUser?.profile_id}/`, {
        following: profileData,
      });
      /* Update local array. */
      setSavedFollowed((prevData) => ({
        ...prevData,
        following: profileData,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Follow button with conditional variant, label and text. */}
      <Button
        aria-label={profileFollowed ? "Unfollow" : "Follow"}
        variant={profileFollowed ? "secondary" : "primary"}
        onClick={handleClick}
        className="text-nowrap">
        <IconText
          text={md && (profileFollowed ? "Unfollow" : "Follow")}
          icon="rss"
          left
        />
      </Button>
    </>
  );
};

export default FollowProfileButton;
