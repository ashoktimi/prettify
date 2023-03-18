import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import NavbarBottom from '../routesNav/NavBottom';
import { Row, Col } from 'react-bootstrap';

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
        <>
         {data.products && data.products.length >0 ?
           <Row style={{  width: '80%', left:0, right:0, margin: 'auto', marginTop: '2rem' }}> 
            <div>
              <h3 className="Head-Name">{(data.name).trim().replace("_", " ")}</h3>   
            </div>     
            {data.products.map(p => (
              <Col key={p.id} xs={6} md={4}  style={{ height: '500px'}}>  
                <ProductCard 
                  id={p.id}
                  name={p.name} 
                  price={p.price}
                  priceSign={p.price_sign}
                  prevPrice={p.prev_price}
                  image_link={p.image_link}
                  rating={p.rating}
                  numOfRating={p.number_rating}
                />  
              </Col>       
            ))}
           </Row>
          :
          null 
          }
        <NavbarBottom/>
      </>
    )
  };

export default  Type;