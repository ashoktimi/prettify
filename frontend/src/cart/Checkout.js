import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getTotals } from './cartSlice';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    billingAddress: ''
  });

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  }

  return (
   <div style={{width: '70%', marginLeft: '15%', marginTop: '5rem', display:'flex', justifyContent: 'space-between'}}>

    <Form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <Row>
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="formCountry">
            <Form.Label>Country:</Form.Label>
            <Form.Control type="text" name="country" value={formData.country} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPostalCode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
      </Form.Group>

      <h2>Payment Details</h2>
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number:</Form.Label>
        <Form.Control type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="formExpMonth">
            <Form.Label>Expiration Month:</Form.Label>
            <Form.Control type="text" name="expMonth" value={formData.expMonth} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formExpYear">
            <Form.Label>Expiration Year:</Form.Label>
            <Form.Control type="text" name="expYear" value={formData.expYear} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCVV">
            <Form.Label>CVV:</Form.Label>
            <Form.Control type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="billingAddress">
            <Form.Label>Billing Address:</Form.Label>
            <Form.Control type="text" name="billing" value={formData.billing} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant='warning' style={{marginTop: '10px'}}>Submit</Button>
      </Form>
      <div style={{backgroundColor: 'white', padding: '0 3rem 5rem 3rem', width: '40%', marginLeft: '1rem', marginTop: '5rem', height: 'fit-content'}}>
        <h5 style={{textAlign: 'center', marginBottom: '1.5rem', marginTop:'2rem'}}>IN YOUR BAG</h5>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Subtotal:</p>
          <p>${cart.cartTotalAmount}</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Estimated Shipping:</p>
          <p>0</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Estimated Tax:</p>
          <p>0</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h5>Total:</h5>
          <h5> ${cart.cartTotalAmount}</h5>
        </div>        
      </div>
     </div>
  )}
  export default CheckoutPage;