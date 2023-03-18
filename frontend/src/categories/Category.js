import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import NavbarBottom from '../routesNav/NavBottom';
import { Row, Col } from 'react-bootstrap';

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
              navigate(-1)
            }
        }
        getCategory(id)
      }, [id, navigate]);

      if (!category) return <LoadingSpinner />;

      return(
        <>
         {category.products && category.products.length >0 ?
          <Row style={{  width: '80%', left:0, right:0, margin: 'auto', marginTop: '2rem' }}> 
          <div>
            <h3 className="Head-Name">{category.name}</h3> 
          </div>
          {category.products.map(p => (     
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
   )};

export default  Category;

