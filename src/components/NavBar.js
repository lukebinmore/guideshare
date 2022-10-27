import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { ComponentParent } from "../utils/utils";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import logo from "../assets/logo.png";
import AdminButton from "./AdminButton";
import AuthButton from "./AuthButton";
import Avatar from "./Avatar";
import NavButton from "./NavButton";
import PostSearch from "./PostSearch";
import ThemeButton from "./ThemeButton";
import useBreakpoints from "../hooks/useBreakpoints";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ titles }) => {
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const { md, lg } = useBreakpoints();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const title = titles[`/${pathname.split("/")[1]}`];
    document.title = `GuideShare - ${title || "Not Found"}`;
    setPageTitle(title);
  }, [pathname, titles]);

  const navLinks = (
    <>
      <ComponentParent
        condition={!md}
        wrapper={(children) => (
          <Dropdown>
            <Dropdown.Toggle aria-label="Navigation Menu">
              <i className="fa-solid fa-bars" />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.NavMenu}>{children}</Dropdown.Menu>
          </Dropdown>
        )}>
        <NavButton to="home" dropdown={!md} left hr={!md} className="me-2" />
        <NavButton to="feed" dropdown={!md} left hr={!md} className="me-2" />
        <NavButton
          to="saved"
          dropdown={!md}
          left
          hr={!md && currentUser}
          className="me-2"
        />
        {currentUser && <NavButton to="wip" dropdown={!md} left />}
      </ComponentParent>
    </>
  );

  const loggedInItems = (
    <>
      <AdminButton dropdown right hr />
      <NavButton to="myProfile" dropdown right hr />
      <ThemeButton dropdown right hr />
      <AuthButton page="changePassword" dropdown right hr />
      <NavButton to="contactUs" dropdown right hr />
      <AuthButton page="signout" variant="danger" dropdown right />
    </>
  );

  const loggedOutItems = (
    <>
      <AuthButton page="login" dropdown right hr />
      <AuthButton page="signup" dropdown right hr />
      <ThemeButton dropdown right hr />
      <NavButton to="contactUs" dropdown right />
    </>
  );

  return (
    <>
      {!md && (
        <NavLink to="/" aria-label="Home">
          <Image alt="Home" src={logo} className="w-50 mx-auto d-block p-1" />
        </NavLink>
      )}
      <Container fluid className={styles.NavBar}>
        <Row className={styles.NavBarRow}>
          <Col xs="auto">{navLinks}</Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h1>{pageTitle}</h1>
          </Col>
          <Col xs="auto">
            <Form.Label
              className="d-md-inline-block d-none btn btn-outline-primary mb-0"
              htmlFor="account-toggle">
              {currentUser ? currentUser.username : "Login / Sign Up"}
            </Form.Label>

            <Dropdown className="d-inline-block border-0">
              <Dropdown.Toggle
                aria-label="Login / Sign Up"
                id="account-toggle"
                variant="outline-primary"
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
              <Image alt="Home" src={logo} className={styles.Logo} />
            </NavLink>
            <NavButton to="newPost" left size={lg && "lg"} className="mx-4" />
          </Col>
          <Col>
            <PostSearch />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
