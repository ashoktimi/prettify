import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/userContext";
import { Outlet } from "react-router-dom";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate()

  console.debug(
      "PrivateRoute",
      "currentUser=", currentUser,
  );
  
  useEffect(() =>{
    if (!currentUser) {
      return navigate("/login");
    }
  }, [navigate, currentUser])
  return (
      <Outlet />
  );
}

export default PrivateRoute;


