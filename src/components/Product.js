import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className=" nav-link">
          <Card.Title as="h4">
            <strong>{product.productname}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h6">{product.price}$</Card.Text>
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color={"#f8e825"}
        />
      </Card.Body>
    </Card>
  );
}
