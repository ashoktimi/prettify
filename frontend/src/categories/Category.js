import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import './Category.css';

/** Category Detail page.
 *
 * Renders information about category, along with the products of that category.
 *
 * Routed at /categories/:name/:id
 *
 * Routes ->Category -> ProductCard
 */
const Category = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState ({});

    useEffect(() => {
        async function getCategory (id){
          try {
              let data = await PrettifyApi.getCategory(id);
              setCategory(data);
            } catch (error) {
              console.log(error);
              navigate('/categories')
            }
        }
        getCategory(id)
      }, [id, navigate]);

      if (!category) return <LoadingSpinner />;

      return(
       <div>
        {/* <h1 className="Category-name">{category.name}</h1> */}
         {category.products && category.products.length >0 
         ?<div className="Category-div">
         {category.products.map(p => (     
          <div className="CategoryCard-div" key={p.id}>   
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
         :(
          <div>
             <p>{id} not found.</p>
          </div>
         )}
      </div>
    )
}

export default  Category;

