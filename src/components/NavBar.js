import React from "react";
import { Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContext";
import Avatar from "../components/Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { AdminButton, AuthButton, NavButton } from "./Buttons";
import Search from "./Search";
import useBreakpoints from "../hooks/useBreakpoints";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const { md, lg } = useBreakpoints();

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
      <AdminButton dropdown right hr />
      <NavButton to="myProfile" dropdown right hr />
      <AuthButton page="changePassword" dropdown right hr />
      <NavButton to="contactUs" dropdown right hr />
      <AuthButton page="signout" variant="danger" dropdown right />
    </>
  );

  const loggedOutItems = (
    <>
      <AuthButton page="login" dropdown right hr />
      <AuthButton page="signup" dropdown right hr />
      <NavButton to="contactUs" dropdown right />
    </>
  );

  return (
    <>
      {!md && (
        <NavLink to="/">
          <Image src={logo} className="w-50 mx-auto d-block p-1" />
        </NavLink>
      )}
      <Container fluid className={styles.NavBar}>
        <Row className={styles.NavBarRow}>
          <Col>
            <div className="d-md-block d-none">{navLinks}</div>
            <div className="d-md-none d-block">{navLinksDropdown}</div>
          </Col>
          <Col xs="auto">
            <Form.Label
              className="d-md-inline-block d-none btn btn-outline-primary mb-0"
              htmlFor="account-toggle">
              {currentUser ? currentUser.username : "Login / Sign Up"}
            </Form.Label>

            <Dropdown className="d-inline-block border-0">
              <Dropdown.Toggle
                id="account-toggle"
                className={`rounded-circle p-0 ${styles.Profile}`}>
                <Avatar src={currentUser?.profile_picture} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.UserMenu}>
                {currentUser ? loggedInItems : loggedOutItems}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className={` ${styles.NavBarRow}`}>
          <Col className="d-md-inline-block d-none">
            <NavLink to="/">
              <Image src={logo} className={styles.Logo} />
            </NavLink>
            <NavButton to="newPost" left size={lg && "lg"} className="mx-4" />
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
