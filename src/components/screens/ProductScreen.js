import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productsActions";
import Loader from "../Loader";
import Message from "../Message";

export default function ProductScreen({ params }) {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, params]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container className="mt-5">
      <div>
        <Link to="/" className="btn btn-outline-dark mb-3">
          Go Back
        </Link>
        {loading ? (
          <h2>
            Loading... <Loader />
          </h2>
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.productname} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.productname}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <span className="fw-bold">Price:</span> {product.price}$
                </ListGroupItem>
                <ListGroupItem>
                  <span className="fw-bold">Brand:</span> {product.productbrand}
                </ListGroupItem>
                <ListGroupItem>
                  <span className="fw-bold">Category:</span>{" "}
                  {product.productcategory}
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                      <Col md={3}>{product.stockcount}</Col>
                    </Row>
                  </ListGroupItem>

                  {product.stockcount > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            className="form-select form-select-sm w-auto"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stockcount).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroupItem>
                    <Button
                      className="btn-block btn-success"
                      disabled={product.stockcount == 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col md={6} className="mt-3">
              <ListGroup>
                <ListGroupItem>
                  Description: {product.productinfo}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}
