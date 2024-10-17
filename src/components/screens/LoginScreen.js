import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../Loader";

export default function LoginScreen() {
  const [show, changeshow] = useState("fa fa-eye-slash text-danger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const showPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      changeshow(`fa fa-eye-slash text-danger`);
    } else {
      x.type = "password";
      changeshow(`fa fa-eye text-primary`);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // navigate('/')
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Login
              </Card.Header>
              <Card.Body>
                {error && <Message variant={"danger"}>{error}</Message>}
                {loading && (
                  <h2 className="text-align-centr">
                    <Loader />
                  </h2>
                )}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text onClick={showPassword}>
                        <i className={show}></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Enter Password"
                        required
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="read_offert">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    {loading ? (
                      <Button
                        className="btn btn-md btn-success"
                        variant="primary"
                        type="submit"
                        disabled
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-md btn-success"
                        variant="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    You don't have an account
                    <Link to="/signup"> Sign Up</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}
