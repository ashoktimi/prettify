import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import './Brand.css';

/** Brand Detail page.
 *
 * Renders information about brand, along with the products of that brands.
 *
 * Routed at /brands/:name/:id
 *
 * Routes ->Brand -> ProductCard
 */
const Brand = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [brand, setBrand] = useState ({});

    useEffect(() => {
        async function getBrand (id){
          try {
              let data = await PrettifyApi.getBrand(id);
              setBrand(data);
            } catch (error) {
              console.log(error);
              navigate('/brands')
            }
        }
        getBrand(id)
      }, [id, navigate]);

      if (!brand) return <LoadingSpinner />;

      return(
        <div>
          {brand.products && brand.products.length >0 
          ?<div>
            {/* <h3 className="Brand-name">{brand.name}</h3> */}
            <div className="Brand-div">
            {brand.products.map(p => (
             <div className="BrandCard-div" key={p.id}>   
              <ProductCard 
                id={p.id}             
                name={p.name} 
                price={p.price}
                priceSign={p.price_sign}
                prevPrice={p.prev_price}
                image={p.image_link}
                rating={p.rating}
                numOfRating={p.number_rating}
              />  
             </div>        
          ))}
          </div>
          </div>
          :(
           <div>
              <p>{id} not found.</p>
           </div>
          )}
        </div>
      )
}

export default  Brand;