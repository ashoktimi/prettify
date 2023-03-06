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
                name={product.name} 
                price={product.price}
                priceSign={product.price_sign}
                prevPrice={product.prev_price}
                description={product.description}
                image={product.image_link}
                rating={product.rating}
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

