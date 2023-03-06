import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import './Tag.css';

const Tag = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [tag, setTag] = useState ({});

    useEffect(() => {
        async function getTag (id){
          try {
              let data = await PrettifyApi.getTaglist(id);
              setTag(data);
            } catch (error) {
              console.log(error);
              navigate('/tags')
            }
        }
        getTag(id)
      }, [id, navigate]);
      if (!tag) return <LoadingSpinner />;

      return(
          <div>
          {/* <h1 className="Tag-name">{tag.name}</h1> */}
            {tag.products && tag.products.length >0 
            ?<div className="Tag-div">
            {tag.products.map(p => (
            <div className="TagCard-div" key={p.id}>
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

export default  Tag;