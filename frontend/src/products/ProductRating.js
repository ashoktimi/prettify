
import React from 'react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductRating = ({ rating }) =>{

  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - fullStars - Math.ceil(partialStar);
  
  return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className="ProductDetail-star"
              style={{ color: '#fdd835' }}
            />
          ))}
          {partialStar > 0 && (
            <FontAwesomeIcon
              icon={faStarHalfAlt}
              className="ProductDetail-star"
              style={{ color: '#fdd835' }}
            />
          )}
          {Array.from({ length: emptyStars }, (_, i) => (
            <FontAwesomeIcon
              key={i + fullStars}
              icon={faStar}
              className="ProductDetail-star"
              style={{ color: 'lightgray' }}
            />
          ))}
     </>
    )  
}
  
export default ProductRating;