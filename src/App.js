import "./api/axiosDefaults";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import AuthModal from "./pages/auth/AuthModal";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import NewPostForm from "./pages/posts/NewPostForm";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/currentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <>
      <AuthModal />
      <NavBar />
      <Container className="my-3 text-center g-0">
        <Routes>
          <Route index element={<PostsPage />} />
          <Route
            path="/feed"
            element={
              <PostsPage pageFilter={`owner__followers=${profile_id}`} />
            }
          />
          <Route
            path="/saved"
            element={<PostsPage pageFilter={`post_saves=${profile_id}`} />}
          />
          <Route path="/profile/:id" element={<h1>Profile Page</h1>} />
          <Route path="/new-post" element={<NewPostForm />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
