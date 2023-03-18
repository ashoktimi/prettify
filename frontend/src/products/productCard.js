import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserContext from "../auth/userContext";
import { addToCart  } from "../cart/cartSlice";
import defaultImage from '../images/spinning image.png'
import ProductRating from './ProductRating';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';


const ProductCard = ({ id, name, price, priceSign, prevPrice, image_link, rating, numOfRating,  }) => { 
  const product = {
    id,
    name,
    price,
    priceSign,
    prevPrice,
    image_link,
    rating,
    numOfRating,
  };
  const { handleToggleOffcanvas } = useContext(UserContext);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    handleToggleOffcanvas();
  };


 return (
  <>
    <Card className='ProductCard'>
      <div  className='ProductCard-imgDiv'>
      <Link to={`/products/${(name).trim().replace(/ /g, "-")}/${id}`} key={id}>
      <Card.Img
        variant='top'
        className="img"
        src={image_link}
        alt={name}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      </Link>
      </div>
      <Card.Body className='ProductCard-body'>
        <Card.Title style={{ textAlign: 'center'}}>{name}</Card.Title>
        <div style={{display:'flex', justifyContent:'center'}}>
          {priceSign ?
          <>
            <small className="ProductCard-price"> {priceSign}{price} </small> 
            <small className="ms-2 text-muted priceBefore"> before {priceSign}{prevPrice.toFixed(2)} </small>   
          </>
          :
          <>
            <small className="ProductCard-price"> ${price} </small> 
            <small className="ms-2 text-muted priceBefore"> before ${prevPrice.toFixed(2)} </small>   
          </>
          }
        </div>
          <div className="ProductCard-rating">
            <small>({rating})</small>
            <ProductRating rating={rating} />
            <p> ({numOfRating}) Reviews </p> 
          </div>       
        <Button className="productAddBtn" variant="" onClick={() => handleAddToCart(product)} >add to cart</Button>   
      </Card.Body>
    </Card>
    </>
  );
};

export default ProductCard;


