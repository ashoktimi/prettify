// import React, { useState } from 'react';
// import defaultImage from '../images/spinning image.png'

// const ProductDetail = ({ name, price, priceSign, prevPrice, description, image, rating, numOfRating, color }) => {
//   const [count, setCount] = useState(0)

//   function handleSubmit(){
//     setCount(c => c+1)
//   }
//   const imageUrl = image || defaultImage;

//   return (
//     <div className="ProductDetail">
//       <img
//         className="ProductDetail-image"
//         src={imageUrl}
//         alt={name}
//         onError={(e) => {
//           e.target.src = defaultImage;
//         }}
//       />
//       <div className="ProductDetail-info">
//         <p className="ProductDetail-name">{name}</p>
//         <p className="ProductDetail-description">{description}</p>      
//         <p className="ProductDetail-price">{priceSign}{price}</p> <br/>
//         <small className="ProductDetail-price">before {priceSign}{prevPrice}</small>
//         <div className="ProductDetail-rating">
//           <small>({rating})</small>
//           {Array.from({ length: 5 }, (_, i) => (
//               <span
//                 key={i}
//                 className="ProductDetail-star"
//                 style={{
//                   color: i < rating ? '#fdd835' : 'lightgray',
//                 }}
//               >
//                 &#9733;
//               </span>
//             ))}
//           <p>({numOfRating}) Reviews</p>          
//         </div>
//         <p>{count}</p>
//         <button className="product-addBtn" onClick={handleSubmit}>ADD To CART</button>
//       </div>
//       <div>
//        {color !== undefined ?
//        <div>
//       {color.map(c =>(
//         <li style={{ color: `${c.hex_value}` }} key={c.id}></li>   
//       ))}
//       </div>: <></>
//        } 

//       </div>      
//     </div>
//   );
// };

// export default ProductDetail;




// import './ProductDetail.css';

















// import React, { useState, useContext } from 'react';
// import { useDispatch } from "react-redux";
// import UserContext from "../auth/userContext";
// import { addToCart,  } from "../cart/cartSlice";
// import defaultImage from '../images/spinning image.png'
// import { Card, Button } from 'react-bootstrap';
// import './ProductDetail.css';

// const ProductDetail = ({id, name, price, priceSign, prevPrice, description, image, rating, numOfRating, color }) => {
//   const product = {
//     id,
//     name,
//     price,
//     priceSign,
//     prevPrice,
//     image,
//     rating,
//     numOfRating,
//   };
//   const { handleToggleOffcanvas } = useContext(UserContext);
//   const dispatch = useDispatch();
//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     handleToggleOffcanvas();
//   };

//   const [review, setReview] = useState({
//     name: '',
//     rating: '',
//     comment: '',
//   });

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     console.log(review);
//     setReview({
//       name: '',
//       rating: '',
//       comment: '',
//     });
//   };

//   const imageUrl = image || defaultImage;

//   return (
//     <div className="ProductDetail">
//       <img
//         className="ProductDetail-image"
//         src={imageUrl}
//         alt={name}
//         onError={(e) => {
//           e.target.src = defaultImage;
//         }}
//       />
//       <div className="ProductDetail-info">
//         <p className="ProductDetail-name">{name}</p>
//         <p className="ProductDetail-description">{description}</p>      
//         <p className="ProductDetail-price">{priceSign}{price}</p> <br/>
//         <small className="ProductDetail-price">before {priceSign}{prevPrice}</small>
//         <div className="ProductDetail-rating">
//           <small>({rating})</small>
//           {Array.from({ length: 5 }, (_, i) => (
//               <span
//                 key={i}
//                 className="ProductDetail-star"
//                 style={{
//                   color: i < rating ? '#fdd835' : 'lightgray',
//                 }}
//               >
//                 &#9733;
//               </span>
//             ))}
//           <p>({numOfRating}) Reviews</p>                
//         </div>
//         <Button  variant="warning" onClick={() => handleAddToCart(product)} >add to cart</Button>  
         

//         {/* Write review form */}
//         <form onSubmit={handleReviewSubmit} className="ProductDetail-reviewForm">
//           <h3>Write a review</h3>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={review.name}
//               onChange={(e) =>
//                 setReview({ ...review, name: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="rating">Rating:</label>
//             <select
//               id="rating"
//               value={review.rating}
//               onChange={(e) =>
//                 setReview({ ...review, rating: e.target.value })
//               }
//               required
//             >
//               <option value="">--Select--</option>
//               <option value="1">1 star</option>
//               <option value="2">2 stars</option>
//               <option value="3">3 stars</option>
//               <option value="4">4 stars</option>
//               <option value="5">5 stars</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="comment">Comment:</label>
//             <textarea
//               id="comment"
//               value={review.comment}
//               onChange={(e) =>
//                 setReview({ ...review, comment: e.target.value })
//               }
//               required
//             ></textarea>
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       </div>
//   )}

//   export default ProductDetail;

















import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import UserContext from "../auth/userContext";
import { addToCart,  } from "../cart/cartSlice";
import defaultImage from '../images/spinning image.png'
import ProductRating from './ProductRating';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const ProductDetail = ({id, name, price, priceSign, prevPrice, description, image_link, rating, numOfRating, color }) => {
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
  const imageUrl = image_link || defaultImage;

  return (  
      <Container style={{marginTop: '5rem'}}>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <Image
              className="ProductDetail-image"
              src={imageUrl}
              alt={name}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              style={{width: '30rem', height: '30rem', backgroundColor: 'white'}}
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="ProductDetail-info">
              <h5 className="ProductDetail-name">{name}</h5>
              <p className="ProductDetail-description">{description}</p>
                <small className="ProductCard-price"> {priceSign}{price} </small> 
                <small className="ms-2 text-muted priceBefore"> before {priceSign}{prevPrice} </small>
                <div className="ProductDetail-rating">
                  <small>({rating})</small>
                  <ProductRating rating={rating} />
                  <p>({numOfRating}) Reviews</p>   
                  {color && (
                    <div>
                      {color.map(c => (
                        <div
                          key={c.id}
                          style={{
                            backgroundColor: `${c.hex_value}`,
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginLeft: '5px'
                          }}
                          />
                      ))}
                    </div>
                  )}       
                </div>          
                <Button variant="warning"  onClick={() => handleAddToCart(product)} style={{marginTop:"2rem"}} >ADD To CART</Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

export default ProductDetail;