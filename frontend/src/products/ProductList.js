import React, { useState, useEffect } from "react";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "./productCard";
import NavbarBottom from '../routesNav/NavBottom';
import SearchForm from "../helpers/SearchForm";
import { Row, Col } from 'react-bootstrap';

const ProductList = () =>{
    console.debug("ProductList");
    const [products, setProducts] = useState(null);


    useEffect(function getProductsOnMount() {
        console.debug("ProductList useEffect getProductsOnMount");
        search();
      }, []);

    /** Triggered by search form submit; reloads brands. */
    async function search(name) {
      if(!name){
        let products = await PrettifyApi.getSpecialProducts();
        setProducts(products.products);
      }else{
        let products = await PrettifyApi.getProducts(name);
        setProducts(products.products);
    }
  }

    if (!products) return <LoadingSpinner />;

    return ( 
      <>        
        <Row style={{  width: '80%', left:0, right:0, margin: 'auto'}}> 
          <div>
            <div style={{display:"flex", justifyContent:"space-between", backgroundColor:'rgb(37, 150, 190)', height: '48px', marginBottom:'10px'}}>
              <h3 className="Head-Name">All</h3>   
              <SearchForm searchFor={search} />               
            </div>
          </div> 
          {products.map(p => (
            <Col key={p.id} xs={6} md={4}  style={{ height: '500px'}}>                  
              <ProductCard          
                id={p.id}
                name = {/[A-Z0-9]/.test(`${p.name}`[0]) ? `${p.name}`: `${p.name}`.slice(1)}  
                price={parseFloat(p.price).toFixed(2)}
                priceSign={p.price_sign}
                prevPrice={p.prev_price}
                image_link={p.image_link}
                rating={parseFloat(p.rating).toFixed(1)}
                numOfRating={p.number_rating}
              />   
            </Col>         
          ))} 
        </Row>
        <NavbarBottom />
        </>
    );
}
export default  ProductList;