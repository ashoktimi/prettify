import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import NavbarBottom from '../routesNav/NavBottom';
import { Row, Col } from 'react-bootstrap';
import  './Brand.css';

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
        <>
          {brand.products && brand.products.length >0 ?            
            <Row style={{  width: '80%', left:0, right:0, margin: 'auto'}}> 
            <div>
              <h3 className="Head-Name">{brand.name}</h3> 
            </div>
            {brand.products.map(p => (
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
        <NavbarBottom />
      </>
  )};

export default  Brand;