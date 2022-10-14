import React from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Image,
  Navbar,
  Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSetAuthModal } from "../contexts/authModalContext";
import { useCurrentUser } from "../contexts/currentUserContext";
import Avatar from "../components/Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import appStyles from "../App.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setAuthModal = useSetAuthModal();

  const setActive = (navData) => {
    return navData.isActive ? "btn btn-secondary" : "btn btn-primary";
  };

  const navLinks = (
    <>
      <NavLink end to="/" className={(navData) => setActive(navData)}>
        <i class="fa-solid fa-house" /> Home
      </NavLink>
      <NavLink to="/feed" className={(navData) => setActive(navData)}>
        <i class="fa-solid fa-square-rss" /> Feed
      </NavLink>
      <NavLink to="/saved" className={(navData) => setActive(navData)}>
        <i class="fa-solid fa-floppy-disk" /> Saved
      </NavLink>
    </>
  );

  const navLinksDropdown = (
    <>
      <Dropdown>
        <Dropdown.Toggle className={appStyles.RemoveArrow}>
          <i class="fa-solid fa-bars" />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.Menu}>
          <Dropdown.Item>
            <NavLink end to="/" className={(navData) => setActive(navData)}>
              <i class="fa-solid fa-house" /> Home
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
            <NavLink to="/feed" className={(navData) => setActive(navData)}>
              <i class="fa-solid fa-square-rss" /> Feed
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
            <NavLink to="/saved" className={(navData) => setActive(navData)}>
              <i class="fa-solid fa-floppy-disk" /> Saved
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
            <NavLink to="/contact" className={(navData) => setActive(navData)}>
              <i class="fa-solid fa-envelope-open" /> Contact Us
            </NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedInItems = (
    <>
      <div className="d-md-inline-block d-none">
        <NavLink to="/contact" className={(navData) => setActive(navData)}>
          <i class="fa-solid fa-envelope-open" /> Contact Us
        </NavLink>
        <dt className="d-inline-block px-1">{currentUser?.username}</dt>
      </div>
      <div className={styles.Profile}>
        <Avatar src={currentUser?.profile_picture} />
      </div>
    </>
  );

  const loggedOutItems = (
    <>
      <Button onClick={() => setAuthModal({ show: true, page: "login" })}>
        <i class="fa-solid fa-right-to-bracket" /> Login
      </Button>
      <Button onClick={() => setAuthModal({ show: true, page: "signup" })}>
        <i class="fa-solid fa-user-plus" /> Sign Up
      </Button>
    </>
  );

  return (
    <>
      <Image src={logo} className="w-50 mx-auto d-block d-md-none" />
      <Container fluid className={styles.NavBar}>
        <Row className={styles.NavBarRow}>
          <Col>
            <div className="d-md-block d-none">{navLinks}</div>
            <div className="d-md-none d-block">{navLinksDropdown}</div>
          </Col>
          <Col>
            <div className="text-end">
              {currentUser ? loggedInItems : loggedOutItems}
            </div>
          </Col>
        </Row>
        <Row className={`d-md-flex d-none ${styles.NavBarRow}`}>
          <Col>
            <Image src={logo} className={styles.Logo} />
            <NavLink
              to="/new-post"
              className={(navData) =>
                setActive(navData) + " d-inline-block mx-4"
              }>
              <i class="fa-solid fa-square-plus" /> New Post
            </NavLink>
          </Col>
          <Col className="text-end"></Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
