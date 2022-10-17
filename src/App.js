import "./api/axiosDefaults";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import AuthModal from "./pages/auth/AuthModal";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import NewPostForm from "./pages/posts/NewPostForm";

function App() {
  return (
    <>
      <AuthModal />
      <NavBar />
      <Container className="my-3 text-center g-0">
        <Routes>
          <Route index element={<h1>Home</h1>} />
          <Route path="/feed" element={<h1>Feed</h1>} />
          <Route path="/saved" element={<h1>Saved</h1>} />
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
