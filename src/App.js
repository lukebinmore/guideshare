import "./api/axiosDefaults";
import "./App.module.css";
import { Route, Routes, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import AuthModal from "./pages/auth/AuthModal";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import PostCreateEditForm from "./pages/posts/PostCreateEditForm";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostPage from "./pages/posts/PostPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import ErrorPage from "./pages/errors/ErrorPage";
import useRedirect from "./hooks/useRedirect";

const pageTitles = {
  "/": "Home",
  "/feed": "Feed",
  "/saved": "Saved",
  "/wip": "WIP",
  "/new-post": "New",
  "/posts": "Guide",
  "/profiles": "Profile",
  "/contact-us": "Contact Us",
  "/restricted": "Restricted",
};

const nonUserPages = ["feed", "saved", "wip", "new-post"];

function App() {
  /* Getting the current user and the pathname of the current page. */
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const profile_id = currentUser?.profile_id || "";
  const user_id = currentUser?.pk || "";

  /* Checking if the current page is in the nonUserPages array and if it is it
  redirects to the members page. */
  useRedirect(
    nonUserPages.some((page) => pathname.includes(page)) ? "members" : "pass"
  );

  return (
    <>
      {/* Content found on all pages. */}
      <AuthModal />
      <NavBar titles={pageTitles} />
      {/* Content specific to each page. */}
      <Container className="my-3 text-center g-0">
        <Routes>
          <Route
            index
            element={
              <PostsPage
                message="Why not create a new guide?"
                popularProfiles
              />
            }
          />
          <Route
            path="/feed"
            element={
              <PostsPage
                pageFilter={`owner__profile__followers=${profile_id}`}
                message="Follow some people to see there guides!"
                popularProfiles
              />
            }
          />
          <Route
            path="/saved"
            element={
              <PostsPage
                pageFilter={`post_saves=${profile_id}`}
                message="Save your favourite guides to see them here!"
                popularProfiles
              />
            }
          />
          <Route
            path="/wip"
            element={
              <PostsPage
                pageFilter={`wip=true&owner=${user_id}`}
                message="Only guides you create as WIP in will show here!"
                popularProfiles
              />
            }
          />
          <Route path="/new-post" element={<PostCreateEditForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/edit/:id" element={<PostCreateEditForm edit />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/restricted" element={<ErrorPage target="401" />} />
          <Route path="*" element={<ErrorPage target="404" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
