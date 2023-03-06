import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import './Type.css'

const Type = () =>{
    const { id, type } = useParams();
    const [data, setData] = useState ({});

    useEffect(() => {
        async function getData (id){
              let response = await PrettifyApi.getTypeDetail(id, type);
              setData(response);            
        }
        getData(id)
      }, [id, type]);

      if (!data) return <LoadingSpinner />;

      return(
          <div>
            {/* <h1 className="Type-name">{data.name}</h1> */}
            {data.products && data.products.length >0 
            ?<div className="Type-div">              
              {data.products.map(p => (
              <div className="TypeCard-div" key={p.id}>
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
            : null }
          </div>
      )
}

export default  Type;