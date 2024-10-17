import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardHeader,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { validEmail, validPassword } from "./Regex";
import { signup } from "../../actions/userActions";

export default function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [variant, setVariant] = useState("danger");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fa fa-eye-slash text-danger");

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;


  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);
      setEmail("")
      setFname("")
      setLname("")
      setPass1("")
      setPass2("")
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pass1 != pass2) {
      setMessage("Password do not match");
      setVariant("danger");
      navigate("/signup");
    } else if (!validEmail.test(email)) {
      setMessage("Email is not valid");
      setVariant("danger");
      navigate("/signup");
    } else if (!validPassword.test(pass1)) {
      setMessage("Password is not valid");
      setVariant("danger");
      navigate("/signup");
    } else {
      dispatch(signup(fname, lname, email, pass1));
      setMessage(
        "Signup is successed, We send an email with activation link, Go your email!"
      );
      // navigate("/login");
    }
  };

  const showPassword = () => {
    var x = document.getElementById("pass1");
    var z = document.getElementById("pass2");
    if (x.type === "password" && z.type === "password") {
      x.type = "text";
      z.type = "text";
      changeshow(`fa fa-eye-slash text-danger`);
    } else {
      x.type = "password";
      z.type = "password";
      changeshow(`fa fa-eye text-primary`);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {loading?(<Loader/>):(
               <Card>
               <Card.Header as="h3" className="text-center bg-black text-light">
                 Signup
               </Card.Header>
               <Card.Body>
                 {message && <Message variant={variant}>{message}</Message>}
                 <Form onSubmit={submitHandler}>
                   <Form.Group className="mb-3">
                     <Form.Label>First Name</Form.Label>
                     <InputGroup className="mb-3">
                       <InputGroup.Text>
                         <i className={"fa-regular fa-user"}></i>
                       </InputGroup.Text>
                       <Form.Control
                         placeholder="First name"
                         required
                         type="text"
                         id="fname"
                         value={fname}
                         onChange={(e) => setFname(e.target.value)}
                       />
                     </InputGroup>
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Last Name</Form.Label>
                     <InputGroup className="mb-3">
                       <InputGroup.Text>
                         <i className={"fa-regular fa-user"}></i>
                       </InputGroup.Text>
                       <Form.Control
                         placeholder="Last name"
                         required
                         type="text"
                         id="lname"
                         value={lname}
                         onChange={(e) => setLname(e.target.value)}
                       />
                     </InputGroup>
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <InputGroup className="mb-3">
                       <InputGroup.Text>
                         <i className={"fa fa-envelope "}></i>
                       </InputGroup.Text>
                       <Form.Control
                         placeholder="Email"
                         required
                         type="email"
                         id="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                       />
                     </InputGroup>
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
                         id="pass1"
                         value={pass1}
                         onChange={(e) => setPass1(e.target.value)}
                       />
                     </InputGroup>
                     <Form.Text className="text-muted">
                       Password must include atleast [1-9][a-Z][A-z][_$@*!..] & 8
                       Characters
                     </Form.Text>
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Confirm Password</Form.Label>
                     <InputGroup className="mb-3">
                       <InputGroup.Text onClick={showPassword}>
                         <i className={show}></i>
                       </InputGroup.Text>
                       <Form.Control
                         placeholder="Confirm Password"
                         required
                         type="password"
                         id="pass2"
                         value={pass2}
                         onChange={(e) => setPass2(e.target.value)}
                       />
                     </InputGroup>
                   </Form.Group>
                   <Form.Group className="mb-3">
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
                         Signup
                       </Button>
                     ) : (
                       <Button
                         className="btn btn-md btn-success"
                         variant="primary"
                         type="submit"
                       >
                         Signup
                       </Button>
                     )}
                   </div>
                 </Form>
                 <Row className="py-3">
                   <Col>
                     You have an account
                     <Link to="/login"> Sign In</Link>
                   </Col>
                 </Row>
               </Card.Body>
             </Card>
            )}
           
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}
