import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";

export default function CartScreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const qty = location.search ? Number(location.search.split("=")[1]):1
  

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("login?redirect=shipping");
  };

  return (
    <>
      <Container>
      <Row>
        <Col md={8}>
          <h1 className="mb-5 mt-5">Cart Items</h1>
          {cartItems.length === 0 ? (
            <Message variant={"info"}>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <Container>
              <ListGroup variant="flush" mt={2}>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.image}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`} className=" nav-link">{item.name}</Link>
                      </Col>
                      <Col md={2}>{item.price}$</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.stockcount).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          )}
        </Col>
      </Row>
      </Container>
    </>
  );
}
