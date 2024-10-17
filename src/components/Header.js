import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

export default function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ecommerce | DRF</Navbar.Brand>
        </LinkContainer>

        {/* Toggler button for mobile */}
        <Navbar.Toggle aria-controls="navbarColor01" />

        {/* Collapsible content */}
        <Navbar.Collapse id="navbarColor01">
          <Nav className="me-auto">
            {/* <LinkContainer to="/">
              <Nav.Link>
                <i className="fa-solid fa-house"></i> Home
              </Nav.Link>
            </LinkContainer> */}

            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa-solid fa-cart-shopping"></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <Nav.Item className="dropdown">
                <Nav.Link
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i> {userInfo.first_name}{" "}
                  {userInfo.last_name}
                </Nav.Link>
                <div className="dropdown-menu">
                  <div className="dropdown-divider"></div>
                  <Nav.Link
                    className="dropdown-item text-muted"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Nav.Link>
                </div>
              </Nav.Item>
            ) : (
              <Nav.Item className="dropdown">
                <Nav.Link
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i> New User
                </Nav.Link>
                <div className="dropdown-menu">
                  <LinkContainer to="/login">
                    <Nav.Link className="dropdown-item text-muted">
                      Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link className="dropdown-item text-muted">
                      Register
                    </Nav.Link>
                  </LinkContainer>
                </div>
              </Nav.Item>
            )}
          </Nav>

          {/* Search bar form */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
