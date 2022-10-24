import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import ProfileButton from "./ProfileButton";
import LoadingSpinner from "./LoadingSpinner";
import IconText from "./IconText";
import AdminButton from "./AdminButton";
import { fetchMoreData } from "../utils/utils";
import { useBreakpoints } from "../hooks";
import styles from "../styles/PopularProfiles.module.css";

const PopularProfiles = () => {
  const { md } = useBreakpoints();
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("profiles/?ordering=-popularity");
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, []);

  return (
    <>
      {hasLoaded ? (
        <Card className="mb-3">
          <Card.Header>
            <h4>Recommended Profiles:</h4>
          </Card.Header>

          <AdminButton
            text="User Profiles"
            href="profiles/profile/"
            left
            right
          />

          <div className={styles.Container}>
            {profiles.results.map((profile) => (
              <div key={profile.id} className="mx-1">
                <ProfileButton
                  profile_id={profile.id}
                  src={profile.picture}
                  username={profile.owner}
                  small={!md}
                />
              </div>
            ))}

            {profiles.next && (
              <Button
                className="mx-1"
                onClick={() => fetchMoreData(profiles, setProfiles)}>
                <IconText text="More" icon="angles-right" left />
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PopularProfiles;
