import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../auth/userContext";
import EmptyCart from "./EmptyCart";

import { RiDeleteBinLine } from 'react-icons/ri';
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "./cartSlice";
import { Offcanvas, Stack, Button } from "react-bootstrap";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { showOffcanvas, handleToggleOffcanvas } = useContext(UserContext);


  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  console.log((cart.cartItems).length)

  return (
    <>
    <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{left:0, right:0, margin:'auto'}}>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
    {(cart.cartItems).length?
    <>
    <Stack gap={3}>
      {cart.cartItems.map(item => (
        <Stack gap={2}>
          <Stack direction="horizontal">
          <img
            src={item.image_link}    
            style={{ width: "125px", height: "115px", objectFit: "cover" }}
            alt={''}
          />
            {item.name}{" "}${(item.price)}
            {item.cartQuantity > 1 && (
                <span className="text-muted" style={{ fontSize: ".85rem", letterSpacing:'30px'}}>
                  x{item.cartQuantity }
                </span>
            )}
            {item.cartQuantity > 1?
            <div style={{display: "flex", justifyContent: 'flex-end'}}> 
                ${(item.price * item.cartQuantity)}
            </div> : null
            }
          </Stack>        
          
            <Stack direction="vertical" >         

              <div style={{display: "flex", justifyContent: 'center'}}>
                <button onClick={() => handleDecreaseCart(item)} style={{border:'none', backgroundColor:'white', marginRight: '15px'}}>
                  -
                </button>
                <div style={{ marginRight: '15px'}}>{item.cartQuantity}</div>
                <button onClick={() => handleAddToCart(item)} style={{border:'none', backgroundColor:'white',  marginRight: '15px'}}> + </button>
               
              <Button
                variant="light"
                onClick={() => handleRemoveFromCart(item)}
                style={{backgroundColor: 'white'}}               
              >
                <RiDeleteBinLine />
            </Button>
            </div>   
            </Stack>
        </Stack>

      ))}
      <Button 
        className="ms-auto"
        variant="outline-danger"
        size="sm" 
        onClick={()=> handleClearCart()} 
        style={{width:'fit-content'}}  
       
      >
        Clear Cart
      </Button>
    </Stack>


      <div className="subtotal"style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
        <span style={{marginLeft: '15px'}}>Subtotal : </span>
        <span className="amount">${cart.cartTotalAmount}</span>     
      </div>
      <Button href="/checkout" variant="warning" style={{ margin: '5rem'}}>Check Out</Button>

      </>
      :
      <EmptyCart />
      }
      </Offcanvas.Body>
    </Offcanvas>
    </>
  )

};

export default Cart;