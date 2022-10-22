import "./api/axiosDefaults";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import AuthModal from "./pages/auth/AuthModal";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import PostCreateEditForm from "./pages/posts/PostCreateEditForm";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/currentUserContext";
import PostPage from "./pages/posts/PostPage";

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
              <PostsPage
                pageFilter={`owner__followers=${profile_id}`}
                message="No results, follow some people to see there guides!"
              />
            }
          />
          <Route
            path="/saved"
            element={
              <PostsPage
                pageFilter={`post_saves=${profile_id}`}
                message="No results, save your favourite guides to see them here!"
              />
            }
          />
          <Route path="/new-post" element={<PostCreateEditForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/edit/:id" element={<PostCreateEditForm edit />} />
          <Route path="/profile/:id" element={<h1>Profile Page</h1>} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
