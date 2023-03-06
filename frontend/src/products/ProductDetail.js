import React, { useState } from 'react';
// import './ProductDetail.css';
import defaultImage from '../images/spinning image.png'

const ProductDetail = ({ name, price, priceSign, prevPrice, description, image, rating, numOfRating, color }) => {
  const [count, setCount] = useState(0)

  function handleSubmit(){
    setCount(c => c+1)
  }
  const imageUrl = image || defaultImage;

  return (
    <div className="ProductDetail">
      <img
        className="ProductDetail-image"
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      <div className="ProductDetail-info">
        <p className="ProductDetail-name">{name}</p>
        <p className="ProductDetail-description">{description}</p>      
        <p className="ProductDetail-price">{priceSign}{price}</p> <br/>
        <small className="ProductDetail-price">before {priceSign}{prevPrice}</small>
        <div className="ProductDetail-rating">
          <small>({rating})</small>
          {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="ProductDetail-star"
                style={{
                  color: i < rating ? '#fdd835' : 'lightgray',
                }}
              >
                &#9733;
              </span>
            ))}
          <p>({numOfRating}) Reviews</p>          
        </div>
        <p>{count}</p>
        <button className="product-addBtn" onClick={handleSubmit}>ADD To CART</button>
      </div>
      <div>
       {color !== undefined ?
       <div>
      {color.map(c =>(
        <li style={{ color: `${c.hex_value}` }} key={c.id}></li>   
      ))}
      </div>: <></>
       } 

      </div>      
    </div>
  );
};

export default ProductDetail;