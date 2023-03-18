import React, { useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../auth/userContext';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import './Home.css';


const Home = () =>{    
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    return(
        <>
    {!currentUser ?
     <div style={{marginTop: '5rem', width: '80%', marginLeft: '10%'}}>       
      
        <div class="Home">
          <h2>Welcome!!</h2>
       
          <p className="lead" >All brands makeup items in one, convenient place. Get started by signing in or creating an account.</p>
          <p>Explore our collection of makeup items and find your perfect match.</p>
          <h5>Start Shopping Today</h5>
          <a href="/login" class="btn btn-primary">Shop Now</a>
        </div>
      <div className="feature-boxes">
        <div className="feature-box">
          <h5  style={{textAlign: 'center'}}>Explore Our Features</h5>
          <ul>
            <li className="lead">Search and filter different makeup products.</li>
            <li className="lead">Create a personalized makeup bag with your favorite items.</li>
            <li className="lead">Get recommendations for products based on your skin type and preferences.</li>
          </ul>
        </div>
        <div className="feature-box">
          <h5 style={{textAlign: 'center'}}>Why Choose Our App?</h5>
          <ul>
            <li className="lead">We offer a wide selection of makeup items from different brands.</li>
            <li className="lead">Our platform is easy to use and user-friendly.</li>
            <li className="lead">We prioritize the safety and quality of our products.</li>
          </ul>
        </div>
        <div className="feature-box">
          <h5 style={{textAlign: 'center'}}>Join Our Community</h5>
          <p>Connect with other makeup enthusiasts and share your beauty journey with us on social media.</p>
          <div style={{ display: 'flex', justifyContent: 'center', }}>
            <a className='primary' style={{margin:'15px'}}><BsFacebook/></a>
            <a className='primary' style={{margin:'15px'}}><BsTwitter /></a>
            <a className='primary' style={{margin:'15px'}}><BsInstagram /></a>
          </div>
        </div>
      </div>  
     </div>
    : navigate('/products') }   
    </>
    )
}

export default Home;
