
// import { useState, useEffect } from "react";
// import axios from "axios";

// function ShoppingCart({ userId }) {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     async function getCartItems() {
//       try {
//         const response = await axios.get(`/api/cart/${userId}`);
//         setCartItems(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     getCartItems();
//   }, [userId]);

//   const addItemToCart = async (productId, quantity) => {
//     try {
//       await axios.post(`/api/cart/${userId}`, { productId, quantity });
//       setCartItems((prevItems) => [
//         ...prevItems,
//         { product_id: productId, quantity },
//       ]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const removeItemFromCart = async (productId) => {
//     try {
//       await axios.delete(`/api/cart/${userId}/${productId}`);
//       setCartItems((prevItems) =>
//         prevItems.filter((item) => item.product_id !== productId)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Shopping Cart</h2>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.product_id}>
//             {item.quantity} x Product ID {item.product_id}{" "}
//             <button onClick={() => removeItemFromCart(item.product_id)}>
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const productId = e.target.elements.productId.value;
//           const quantity = parseInt(e.target.elements.quantity.value);
//           addItemToCart(productId, quantity);
//           e.target.reset();
//         }}
//       >
//         <label htmlFor="productId">Product ID:</label>
//         <input type="text" id="productId" name="productId" />
//         <label htmlFor="quantity">Quantity:</label>
//         <input type="number" id="quantity" name="quantity" min="1" />
//         <button type="submit">Add to Cart</button>
//       </form>
//     </div>
//   );
// }

// export default ShoppingCart;
























import React, { useState } from "react";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const showCart = cartItems.length > 0;

  // const saveCartItems = () => {
  //   fetch('/save-cart-items', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(cartItems)
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        <li>
          Product A - $10{" "}
          <button onClick={() => addToCart({ name: "Product A", price: 10 })}>
            Add to Cart
          </button>
        </li>
        <li>
          Product B - $20{" "}
          <button onClick={() => addToCart({ name: "Product B", price: 20 })}>
            Add to Cart
          </button>
        </li>
        <li>
          Product C - $30{" "}
          <button onClick={() => addToCart({ name: "Product C", price: 30 })}>
            Add to Cart
          </button>
        </li>
      </ul>
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100vh",
            backgroundColor: "#f5f5f5",
            boxShadow: "-1px 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: 999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <h2>Shopping Cart</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <h4>Total Price: ${totalPrice}</h4>
          <button onClick={() => setCartItems([])}>Clear Cart</button>
          {/* <button onClick={saveCartItems}>Save Cart Items</button> */}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;







  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PrettifyApi.getBrands();
  //     setbrands(response.brands);      
  //   }
  //   if(isHovered) {
  //     fetchData();
  //   } else {
  //     setbrands([])
  //   }
  // }, [isHovered]);


  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PrettifyApi.getCategories();
  //     setCategories(response.categories);      
  //   }
  //   if (isCategoryHovered) {
  //     fetchData();
  //   } else {
  //     setCategories([])
  //   }
  // }, [isCategoryHovered]);


  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PrettifyApi.getTaglists();
  //     setTags(response.tagLists);     
  //   }
  //   if (isTagHovered) {
  //     fetchData();
  //   } else {
  //     setTags([])
  //   }
  // }, [isTagHovered]);
  
  // const [brands, setBrands] = useState([]);
  // const [categories, setCategories] = useState([]);
    // const [tags, setTags] = useState([]);

    // useEffect(() =>{
  //   async function getBrands() {
  //   let brands = await PrettifyApi.getBrands();     
  //   setBrands(brands.brands);
  //   }
  //   getBrands()     
  // },[])

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PrettifyApi.getCategories();
  //     setCategories(response.categories); 
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await PrettifyApi.getTaglists();
  //     setTags(response.tagLists); 
  //   }
  //   fetchData();
  // }, []);