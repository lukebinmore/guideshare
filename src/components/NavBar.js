import React from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContext";
import Avatar from "../components/Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { AdminButton, AuthButton, NavButton } from "./Buttons";
import Search from "./Search";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const navLinks = (
    <>
      <NavButton to="home" left className="me-2" />
      <NavButton to="feed" left className="me-2" />
      <NavButton to="saved" left />
    </>
  );

  const navLinksDropdown = (
    <>
      <Dropdown>
        <Dropdown.Toggle>
          <i className="fa-solid fa-bars" />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.NavMenu}>
          <NavButton to="home" dropdown left hr />
          <NavButton to="feed" dropdown left hr />
          <NavButton to="saved" dropdown left hr />
          <NavButton to="contactUs" dropdown left />
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
        <Dropdown.Toggle className={`rounded-circle p-0 ${styles.Profile}`}>
          <Avatar src={currentUser?.profile_picture} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.UserMenu}>
          <AdminButton dropdown right hr />
          <NavButton to="myProfile" dropdown right hr />
          <AuthButton page="changePassword" dropdown right hr />
          <NavButton to="contactUs" dropdown right hr />
          <AuthButton page="signout" variant="danger" dropdown right />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedOutItems = (
    <>
      <AuthButton page="login" right />
      <AuthButton page="signup" right />
      <NavButton to="contactUs" right />
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
        <Row className={` ${styles.NavBarRow}`}>
          <Col className="d-md-inline-block d-none">
            <NavLink to="/">
              <Image src={logo} className={styles.Logo} />
            </NavLink>
            <NavButton
              to="newPost"
              left
              className="mx-4 btn-lg d-lg-inline-block d-none"
            />
            <NavButton
              to="newPost"
              left
              className="mx-4 d-lg-none d-inline-block"
            />
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
