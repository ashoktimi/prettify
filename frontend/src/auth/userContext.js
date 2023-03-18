import React from "react";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext();

export default UserContext;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../slices/cartSlice";

// export const ShoppingCartContext = React.createContext({});

// export function ShoppingCartProvider({ children }) { // add children as a prop

//   const [isOpen, setIsOpen] = useState(false);
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTotals());
//   }, [cart, dispatch]);

//   const openCart = () => setIsOpen(true);
//   const closeCart = () => setIsOpen(false);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };
//   const handleDecreaseCart = (product) => {
//     dispatch(decreaseCart(product));
//   };
//   const handleRemoveFromCart = (product) => {
//     dispatch(removeFromCart(product));
//   };
//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };


//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         openCart,
//         closeCart,
//         handleAddToCart,
//         handleDecreaseCart,
//         handleRemoveFromCart,
//         handleClearCart,
//         cart,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// }

// export const UserContext = React.createContext(); // create and export UserContext
