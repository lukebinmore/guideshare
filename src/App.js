import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className={styles.App}>
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={""} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
