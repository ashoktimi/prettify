import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() =>{   
    setTimeout(() =>{
      navigate(-1)
    }, 1000)
  })

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for could not be found.</p>
    </div>
  );
};
export default NotFound;