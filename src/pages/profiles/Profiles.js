import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import { useBreakpoints } from "../../hooks";
import styles from "../../styles/Profiles.module.css";
import {
  AdminButton,
  IconText,
  LoadingSpinner,
  ProfileButton,
} from "../../components";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Profiles = (props) => {
  const { sort = "owner", filter, title, followButton } = props;
  const { md } = useBreakpoints();
  const currentUser = useCurrentUser();
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `profiles/?ordering=${sort}&${filter}`
        );
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [sort, filter]);

  return (
    <>
      {hasLoaded ? (
        <Card className="mb-3">
          <Card.Header>
            <h4>{title}</h4>
          </Card.Header>

          <AdminButton
            text="User Profiles"
            href="profiles/profile/"
            left
            right
          />

          <div className={styles.Container}>
            {profiles.results
              .filter((profile) => profile.id !== currentUser?.pk)
              .map((profile) => (
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

export default Profiles;
