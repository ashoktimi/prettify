
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addToCart} from "../slices/cartSlice";
import defaultImage from '../images/spinning image.png'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {  Card } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ id, name, price, priceSign, prevPrice, image, rating, numOfRating }) => { 
  const product = {
    id,
    name,
    price,
    priceSign,
    prevPrice,
    image,
    rating,
    numOfRating,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
 return (
    <Card className='ProductCard'>
      <div  className='ProductCard-div'>
      <Link to={`/products/${(name).trim().replace(/ /g, "-")}/${id}`} key={id}>
      <Card.Img
        variant='top'
        className="cardimg"
        src={image}
        alt={name}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      </Link>
      </div>

      <Card.Body className='ProductCard-body'>
        <Card.Title >
          <p style={{fontSize: '20px'}}>{name}</p>
        </Card.Title>  
        <Card.Text className='ProductCard-text'>
          <p className="ProductCard-price"> {priceSign}{price} </p> 
          <small className="ProductCard-price-small"> before {priceSign}{prevPrice } </small>      
          <div className="ProductCard-rating">
            <small>({rating.toFixed(2)})</small>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className="ProductCard-star"
                  style={{
                    color: i < rating ? 'black' : 'white',
                  }}
                >
                  &#9733;
                </span>
              ))}
            <p style={{ display:'inline-block', verticalAlign: 'middle',  marginTop: '1.5rem' }}> ({numOfRating}) Reviews </p> 
            </div>
        </Card.Text>
        <Button className="product-addBtn" variant="light" onClick={() => handleAddToCart(product)} >add to cart</Button>   
      </Card.Body>
    </Card>
  );
};

export default ProductCard;



// import { useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import defaultImage from '../images/spinning image.png'

// function ProductCard({  id, name, price, prevPrice, rating, numOfRating, image, addToCart  }) {
//   // const [cartItems, setCartItems] = useState([]);
//   // const [isAddedToCart, setIsAddedToCart] = useState(false);

//   // const addToCart = async (item) => {
//   //   setCartItems((prevItems) => [...prevItems, item]);
//     // try {
//     //   const response = await fetch('/carts', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       product_id: id,
//     //       name,
//     //       price,
//     //       prevPrice,
//     //       rating,
//     //       numOfRating,
//     //       image,
//     //     }),
//     //   });

//     //   if (response.ok) {
//     //     setIsAddedToCart(true);
//     //   }
//     // } catch (error) {
//     //   console.error(error);
//     // }
//   // };

//   // const removeFromCart = (index) => {
//   //   setCartItems((prevItems) => {
//   //     const updatedItems = [...prevItems];
//   //     updatedItems.splice(index, 1);
//   //     return updatedItems;
//   //   });
//   // };

//   // const totalPrice = cartItems.reduce(
//   //   (total, item) => total + item.price,
//   //   0
//   // );


//   // const showCart = cartItems.length > 0;
// const hanlAddToCart = () =>{
//   addToCart()
// }
//   return (
//     <Card className='ProductCard'>
//       <div  className='ProductCard-div'>
//         <Link to={`/products/${name.trim().replace(/ /g, "-")}/${id}`} key={id}>
//           <Card.Img
//             variant='top'
//             className="cardimg"
//             src={image}
//             alt={name}
//             onError={(e) => {
//               e.target.src = defaultImage;
//             }}
//           />
//         </Link>
//       </div>

//       <Card.Body className='ProductCard-body'>
//         <Card.Title>
//           <p style={{ fontSize: '20px' }}>{name}</p>
//         </Card.Title>
//         <Card.Text className='ProductCard-text'>
//           <p className="ProductCard-price"> ${price} </p>
//           {prevPrice && (
//             <small className="ProductCard-price-small"> before ${prevPrice} </small>
//           )}
//           <div className="ProductCard-rating">
//             <small>({rating.toFixed(2)})</small>
//             {Array.from({ length: 5 }, (_, i) => (
//               <span
//                 key={i}
//                 className="ProductCard-star"
//                 style={{
//                   color: i < rating ? 'black' : 'white',
//                 }}
//               >
//                 &#9733;
//               </span>
//             ))}
//             <p style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '1.5rem' }}>
//               ({numOfRating}) Reviews
//             </p>
//           </div>
//         </Card.Text>
//         <Button
//           className="product-addBtn"
//           // variant={isAddedToCart ? 'success' : 'light'}
//           // disabled={isAddedToCart}
//           onClick={hanlAddToCart}
//         >
//           {/* {isAddedToCart ? 'Added to cart' : 'Add to cart'} */}
//         </Button>
//       </Card.Body>
//     </Card>

//   );
// }

// export default ProductCard;









