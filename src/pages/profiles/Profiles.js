import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AdminButton from "../../components/AdminButton";
import IconText from "../../components/IconText";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProfileButton from "../../components/ProfileButton";
import styles from "../../styles/Profiles.module.css";
import appStyles from "../../App.module.css";

const Profiles = (props) => {
  const { sort = "owner", filter, title } = props;
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
            <p className={appStyles.Title}>{title}</p>
          </Card.Header>

          <AdminButton
            text="User Profiles"
            href="profiles/profile/"
            left
            right
          />

          {profiles.results.length ? (
            <div className={styles.Container}>
              {profiles.results.map((profile) => (
                <div key={profile.id} className="mx-1">
                  <ProfileButton
                    profile_id={profile.id}
                    src={profile.picture}
                    username={profile.owner}
                    follow={!!currentUser}
                  />
                </div>
              ))}

              {profiles.next && (
                <Button
                  aria-label="More Profiles"
                  className="mx-1"
                  onClick={() => fetchMoreData(profiles, setProfiles)}>
                  <IconText text="More" icon="angles-right" left />
                </Button>
              )}
            </div>
          ) : (
            <>
              <h1>
                No Profiles Found <i className="fa-solid fa-face-sad-tear" />
              </h1>
            </>
          )}
        </Card>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Profiles;
