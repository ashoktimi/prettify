import React, { useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import UseContext from '../auth/userContext' 


const Home = () =>{    
    const { currentUser } = useContext(UseContext);
    const navigate = useNavigate();
  
    return(
        <>
    {!currentUser ?
    <div className="Homepage" 
        style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection:'column'}}>
        <p className="lead">All brands makeup items in one, convenient place.</p>
        <h1>Welcome Back</h1>
    </div>
    : navigate('/products') }
    </>
    )
}

export default Home;