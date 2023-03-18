import React, { useState, useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "../products/productCard";
import NavbarBottom from '../routesNav/NavBottom';
import { Row, Col } from 'react-bootstrap';

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
              navigate(-1)
            }
        }
        getTag(id)
      }, [id, navigate]);
      if (!tag) return <LoadingSpinner />;

      return(
        <>
          {tag.products && tag.products.length >0 ?
            <Row style={{  width: '80%', left:0, right:0, margin: 'auto', marginTop: '2rem' }}>
            <div>
              <h3 className="Head-Name">{(tag.name).trim().replace("-", " ")}</h3> 
            </div>
            {tag.products.map(p => (
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
    

export default  Tag;