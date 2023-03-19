import React, { useState, useEffect } from "react";
import { addToCart } from "./cartSlice";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import { useDispatch } from "react-redux";
import { Stack } from "react-bootstrap";

const EmptyCart = () => {
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    useEffect(function getProductsOnMount() {
        search();
      }, []);

    async function search() {
        let products = await PrettifyApi.getRecProducts();
        setProducts(products.products);
    }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  
  if (!products) return <LoadingSpinner />;
  return (
  <>
    <p>Your cart is empty</p>
      <p>Why not check out these recommended products?</p>
        <Stack gap={3}>
        {products.map(item => (
          <Stack gap={2}>
            <Stack direction="horizontal">
            <img
              src={item.image_link}    
              style={{ width: "125px", height: "115px", objectFit: "cover" }}
              alt={''}
            />
              {item.name}{" "}${(item.price)}
            </Stack> 
            
              <Stack direction="vertical" >         
  
                <div style={{display: "flex", justifyContent: 'center'}}>
                  <button onClick={() => handleAddToCart(item)} style={{border:'none', backgroundColor:'white',  marginRight: '15px'}}> add to cart </button>
                 
              </div>   
              </Stack>
          </Stack>
  
        ))}
      </Stack>
      </>
  );
};

export default EmptyCart;
