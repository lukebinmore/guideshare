import "./api/axiosDefaults";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import AuthModal from "./pages/auth/AuthModal";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import PostCreateEditForm from "./pages/posts/PostCreateEditForm";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostPage from "./pages/posts/PostPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const user_id = currentUser?.pk || "";

  return (
    <>
      <AuthModal />
      <NavBar />
      <Container className="my-3 text-center g-0">
        <Routes>
          <Route
            index
            element={<PostsPage message="Why not create a new guide?" />}
          />
          <Route
            path="/feed"
            element={
              <PostsPage
                pageFilter={`owner__profile__followers=${profile_id}`}
                message="Follow some people to see there guides!"
              />
            }
          />
          <Route
            path="/saved"
            element={
              <PostsPage
                pageFilter={`post_saves=${profile_id}`}
                message="Save your favourite guides to see them here!"
              />
            }
          />
          <Route
            path="/wip"
            element={
              <PostsPage
                pageFilter={`wip=true&owner=${user_id}`}
                message="Only guides you create as WIP in will show here!"
              />
            }
          />
          <Route path="/new-post" element={<PostCreateEditForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/edit/:id" element={<PostCreateEditForm edit />} />
          <Route path="/profiles/:id" element={<h1>Profile Page</h1>} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
