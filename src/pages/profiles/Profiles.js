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
  /* Destructuring the props object. */
  const { sort = "owner", filter, title } = props;
  const currentUser = useCurrentUser();
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  /* Function to get list of profiles based on sort and filter. */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `profiles/?ordering=${sort}&${filter}`
        );
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    handleMount();
  }, [sort, filter]);

  return (
    <>
      {/* Conditionl render based on response from API call. */}
      {hasLoaded ? (
        <Card className="mb-3">
          {/* Profile list Header */}
          <Card.Header>
            <p className={appStyles.Title}>{title}</p>
          </Card.Header>

          {/* Conditionally rendered admin button. Only rendered for 
          admin users. */}
          <AdminButton
            text="User Profiles"
            href="profiles/profile/"
            left
            right
          />

          {/* Conditionally render profiles if API call returned any. */}
          {profiles.results.length ? (
            <div className={styles.Container}>
              {/* Array mapped into profile buttons. */}
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

              {/* Conditionally rendered next button if more profiles
              are available. */}
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
              {/* No results header, shown when no results are returned
                from API call. */}
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
