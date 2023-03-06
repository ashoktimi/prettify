import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "../helpers/Alert";
import './SignupForm.css'

const SignupForm = ({ signup }) =>{
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password:"",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
    );
    
    
    async function handleSubmit(evt) {
       evt.preventDefault();
       let result = await signup(formData);
       if (result.success) {
         navigate("/products");
       } else {
        setFormErrors(result.errors);
       }
    }

    const handleChange = (evt) =>{
       const  { name, value } = evt.target;
       setFormData(fData => ({
        ...fData, 
        [name]:value
       }))
    }

    return(
        <div className='SignupForm'>
          <h2>Sign Up</h2>      
          <form onSubmit={handleSubmit} style={{width:'80%'}}>
              <label> Username
              <input type="text" name="username" value={formData.username} onChange={handleChange}/>
               </label>
              <label> Password
              <input type="text" name="password" value={formData.password} onChange={handleChange}/>
               </label>
              <label>First Name
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
              </label>
              <label>Last Name
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
              </label>
              <label>Email
              <input type="email" name="email" value={formData.email} onChange={handleChange}/>
              </label>
              
              {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
          </form>
        </div>
    )
}

export default SignupForm;