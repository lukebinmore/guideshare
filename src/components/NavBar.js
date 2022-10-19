import React from "react";
import { Button, Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSetAuthModal } from "../contexts/authModalContext";
import { useCurrentUser } from "../contexts/currentUserContext";
import Avatar from "../components/Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import appStyles from "../App.module.css";
import { AdminButton } from "./Buttons";
import IconText from "./IconText";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setAuthModal = useSetAuthModal();

  const setActive = (navData) => {
    return navData.isActive ? "btn btn-secondary" : "btn btn-primary";
  };

  const navLinks = (
    <>
      <NavLink end to="/" className={(navData) => setActive(navData)}>
        <IconText text="Home" icon="house" left />
      </NavLink>
      <NavLink to="/feed" className={(navData) => setActive(navData)}>
        <IconText text="Feed" icon="square-rss" left />
      </NavLink>
      <NavLink to="/saved" className={(navData) => setActive(navData)}>
        <IconText text="Saved" icon="floppy-disk" left />
      </NavLink>
    </>
  );

  const navLinksDropdown = (
    <>
      <Dropdown>
        <Dropdown.Toggle className={appStyles.RemoveArrow}>
          <i className="fa-solid fa-bars" />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.NavMenu}>
          <Dropdown.Item as="div">
            <NavLink end to="/" className={(navData) => setActive(navData)}>
              <IconText text="Home" icon="house" left />
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <NavLink to="/feed" className={(navData) => setActive(navData)}>
              <IconText text="Feed" icon="square-rss" left />
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <NavLink to="/saved" className={(navData) => setActive(navData)}>
              <IconText text="Saved" icon="floppy-disk" left />
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <NavLink
              to="/contact-us"
              className={(navData) => setActive(navData)}>
              <IconText text="Contact Us" icon="envelope-open" left />
            </NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedInItems = (
    <>
      <div className="d-md-inline-block d-none">
        <dt className="d-inline-block px-1">{currentUser?.username}</dt>
      </div>
      <Dropdown className="d-inline-block border-0">
        <Dropdown.Toggle
          className={`rounded-circle p-0 ${styles.Profile} ${appStyles.RemoveArrow}`}>
          <Avatar src={currentUser?.profile_picture} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.UserMenu}>
          <AdminButton dropdown right hr />
          <Dropdown.Item as="div">
            <NavLink
              to={`/profile/${currentUser?.profile_id}`}
              className={(navData) => setActive(navData)}>
              <IconText text="My Profile" icon="user" right />
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <Button
              onClick={() =>
                setAuthModal({ show: true, page: "passwordChange" })
              }>
              <IconText text="Change Password" icon="key" right />
            </Button>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <NavLink
              to="/contact-us"
              className={(navData) => setActive(navData)}>
              <IconText text="Contact Us" icon="envelope-open" right />
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <Button
              variant="danger"
              onClick={() => setAuthModal({ show: true, page: "signout" })}>
              <IconText text="Sign Out" icon="right-from-bracket" right />
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedOutItems = (
    <>
      <Button onClick={() => setAuthModal({ show: true, page: "login" })}>
        <IconText text="Login" icon="right-to-bracket" left />
      </Button>
      <Button onClick={() => setAuthModal({ show: true, page: "signup" })}>
        <IconText text="Sign Up" icon="user-plus" left />
      </Button>
      <NavLink
        to="/contact-us"
        className={(navData) =>
          setActive(navData) + " d-none d-md-inline-block"
        }>
        <IconText text="Contact Us" icon="envelope-open" left />
      </NavLink>
    </>
  );

  return (
    <>
      <NavLink to="/">
        <Image src={logo} className="w-50 mx-auto d-block d-md-none p-1" />
      </NavLink>
      <Container fluid className={styles.NavBar}>
        <Row className={styles.NavBarRow}>
          <Col xs="1" sm="1" md="6">
            <div className="d-md-block d-none">{navLinks}</div>
            <div className="d-md-none d-block">{navLinksDropdown}</div>
          </Col>
          <Col xs="11" sm="11" md="6">
            <div className="text-end">
              {currentUser ? loggedInItems : loggedOutItems}
            </div>
          </Col>
        </Row>
        <Row className={`d-md-flex d-none ${styles.NavBarRow}`}>
          <Col>
            <NavLink to="/">
              <Image src={logo} className={styles.Logo} />
            </NavLink>
            <NavLink
              to="/new-post"
              className={(navData) =>
                setActive(navData) + " d-inline-block mx-4"
              }>
              <IconText text="New Post" icon="square-plus" left />
            </NavLink>
          </Col>
          <Col className="text-end"></Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
