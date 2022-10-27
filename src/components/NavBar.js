import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import AdminButton from "./AdminButton";
import AuthButton from "./AuthButton";
import NavButton from "./NavButton";
import PostSearch from "./PostSearch";
import { useBreakpoints } from "../hooks";
import styles from "../styles/NavBar.module.css";
import { ThemeButton } from ".";
import { ComponentParent } from "../utils/utils";

const NavBar = ({ titles }) => {
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const { md, lg } = useBreakpoints();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const title = titles[`/${pathname.split("/")[1]}`];
    document.title = `GuideShare - ${title}`;
    setPageTitle(title);
  }, [pathname, titles]);

  const navLinks = (
    <>
      <ComponentParent
        condition={!md}
        wrapper={(children) => (
          <Dropdown>
            <Dropdown.Toggle>
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
        <NavLink to="/">
          <Image src={logo} className="w-50 mx-auto d-block p-1" />
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
              <Image src={logo} className={styles.Logo} />
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
