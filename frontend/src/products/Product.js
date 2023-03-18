import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductDetail from "./ProductDetail"

const Product = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState ({});

    useEffect(() => {
        async function getProduct (id){
          try {
              let data = await PrettifyApi.getProduct(id);
              setProduct(data);
            } catch (error) {
              console.log(error);
              alert(`${id} not found.`)
              navigate('/products')
            }
        }
        getProduct(id)
      }, [id, navigate]);

      if (!product) return <LoadingSpinner />;
      return(
          <div>
            {product
            ?(<div className="Product-div" key={product.id}>              
               <ProductDetail 
                id={product.id}
                name={product.name} 
                price={parseFloat(product.price).toFixed(2)}
                priceSign={product.price_sign}
                prevPrice={parseFloat(product.prev_price).toFixed(2)}
                description={product.description}
                image_link={product.image_link}
                rating={parseFloat(product.rating).toFixed(1)}
                numOfRating={product.number_rating}
                color={product.colors}
              />                
            </div>
            )
            :(
             <div>
                <p>{id} not found.</p>
             </div>
            )}
          </div>
      )
}

export default  Product;

