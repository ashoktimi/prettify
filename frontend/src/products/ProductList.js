import React, { useState, useEffect } from "react";
import PrettifyApi from "../api/api";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ProductCard from "./productCard";
import './ProductList.css'
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
      let products = await PrettifyApi.getProducts(name);
      setProducts(products.products);
    }

    if (!products) return <LoadingSpinner />;

    return ( 
        <Row style={{ width: '80%',  left:0, right:0, margin: 'auto' }}>  
          {products.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3} >       
                   
              <ProductCard          
                id={p.id}
                name = {/[A-Z0-9]/.test(`${p.name}`[0]) ? `${p.name}`: `${p.name}`.slice(1)}  
                price={p.price}
                priceSign={p.price_sign}
                prevPrice={p.prev_price}
                image={p.image_link}
                rating={p.rating}
                numOfRating={p.number_rating}
              />   
            </Col>         
          ))} 
        </Row>
    );
}

export default  ProductList;










// import React, { useState, useEffect } from "react";
// import PrettifyApi from "../api/api";
// import LoadingSpinner from "../helpers/LoadingSpinner";
// import ProductCard from "./productCard";
// import './ProductList.css'
// import { Row, Col } from 'react-bootstrap';


// const ProductList = () =>{
//     console.debug("ProductList");
//     const [products, setProducts] = useState(null);
//     const [cartItems, setCartItems] = useState([]);


//     useEffect(function getProductsOnMount() {
//         console.debug("ProductList useEffect getProductsOnMount");
//         search();
//       }, []);

//     /** Triggered by search form submit; reloads brands. */
//     async function search(name) {
//       let products = await PrettifyApi.getProducts(name);
//       setProducts(products.products);
//     }

//     if (!products) return <LoadingSpinner />;



//     const addToCart = async (item) => {
//       setCartItems((prevItems) => [...prevItems, item]);
//     }

//       const removeFromCart = (index) => {
//         setCartItems((prevItems) => {
//           const updatedItems = [...prevItems];
//           updatedItems.splice(index, 1);
//           return updatedItems;
//         });
//       };
    
//       // const totalPrice = cartItems.reduce(
//       //   (total, item) => total + item.price,
//       //   0
//       // );
    
    
//       const showCart = cartItems.length > 0;
    







//     return ( 
//       <>
//         <Row style={{ width: '80%',  left:0, right:0, margin: 'auto' }}>  
//           {products.map(p => (
//             <Col key={p.id} xs={12} sm={6} md={4} lg={3} >       
                   
//               <ProductCard          
//                 id={p.id}
//                 name = {/[A-Z0-9]/.test(`${p.name}`[0]) ? `${p.name}`: `${p.name}`.slice(1)}  
//                 price={p.price}
//                 priceSign={p.price_sign}
//                 prevPrice={p.prev_price}
//                 image={p.image_link}
//                 rating={p.rating}
//                 numOfRating={p.number_rating}
//                 addToCart={addToCart}
//               />   
//             </Col>         
//           ))} 
//         </Row>
//         {showCart && (
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 right: 0,
//                 width: "300px",
//                 height: "100vh",
//                 backgroundColor: "#f5f5f5",
//                 boxShadow: "-1px 0 10px rgba(0, 0, 0, 0.2)",
//                 zIndex: 999,
//                 padding: "20px",
//                 boxSizing: "border-box",
//               }}
//             >
//               <h2>Shopping Cart</h2>
//               <ul>
//                 {cartItems.map((item, index) => (
//                   <li key={index}>
//                     {item.name} - ${item.price}
//                     <button onClick={() => removeFromCart(index)}>Remove</button>
//                   </li>
//                 ))}
//               </ul>
//               {/* <h4>Total Price: ${totalPrice}</h4> */}
//               <button onClick={() => setCartItems([])}>Clear Cart</button>
//               {/* <button onClick={saveCartItems}>Save Cart Items</button> */}
//             </div>
//           )}
//       </>
//     );
// }

// export default  ProductList;



// // backgroundColor: 'rgb(219, 204, 205)'
