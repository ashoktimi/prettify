import {  Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import PrettifyApi from "../api/api";
import Brand from "../brands/Brand";
import ProductList from "../products/ProductList";
import Product from "../products/Product";
import Home from "../home/Home";
import NavBar from "./NavBar";
import CategoryList from "../categories/CategoyList";
import Category from "../categories/Category";
import TagLists from "../tags/TagLIst";
import Tag from "../tags/Tag";
import TypeList from "../types/TypeList";
import Type from "../types/Type";
import PrivateRoute from "./privateRoute";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import useLocalStorage from "../hooks/useLocalStorage";
import UserContext from "../auth/userContext";
import LoadingSpinner from "../helpers/LoadingSpinner";
import NotFound from "./NotFound";
import CheckoutPage from "../cart/Checkout";
import "react-toastify/dist/ReactToastify.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "prettify-token";

const Routers = () =>{
const [infoLoaded, setInfoLoaded] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
const [showOffcanvas, setShowOffcanvas] = useState(false);

const handleToggleOffcanvas = () => {
  setShowOffcanvas(!showOffcanvas);
};

// Load user info from API. Until a user is logged in and they have a token,
// this should not run. It only needs to re-run when a user logs out, so
// the value of the token is a dependency for this effect.
useEffect(function loadUserInfo() {
  async function getCurrentUser(){
    if (token) {
      try {
        let { username } = jwt.decode(token);
        PrettifyApi.token = token;
        let currentUser = await PrettifyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setCurrentUser(null);
      }}
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
},[token])


/** Handles site-wide logout. */
function logout() {
  setCurrentUser(null);
  setToken(null);
}

/** Handles site-wide login.
 *
 * Make sure you await this function and check its return value!
 */

async function login(loginData) {
  try {
    let token = await PrettifyApi.login(loginData);
    setToken(token);
    let { username } = loginData;
    let currentUser = await PrettifyApi.getCurrentUser(username);
    setCurrentUser(currentUser);
    return { success: true };
  } catch (errors) {
    console.error("login failed", errors);
    return { success: false, errors };
  }
}

/** Handles site-wide signup.
*
* Automatically logs them in (set token) upon signup.
*
* Make sure you await this function and check its return value!
*/
  async function signup(signupData) {
    try {
      let token = await PrettifyApi.signup(signupData);
      setToken(token);
      let { username } = signupData;
      let currentUser = await PrettifyApi.getCurrentUser(username);
      setCurrentUser(currentUser);
        return { success: true };
      } catch (errors) {
        console.error("signup failed", errors);
        return { success: false, errors };
      }
  }
  if (!infoLoaded) return <LoadingSpinner />;
    return(
        <div>
          <BrowserRouter>
          <ToastContainer />
            <UserContext.Provider
             value={{ currentUser, setCurrentUser, showOffcanvas, handleToggleOffcanvas }}>
            <NavBar logout={logout}/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>    
                <Route path='/login' element={<LoginForm login={login}/>}></Route>
                <Route path='/signup' element={<SignupForm signup={signup}/>}></Route>
                <Route element={<PrivateRoute/>}>
                  <Route path='/products' element={<ProductList/>}></Route>
                  <Route path='/products/:name/:id' element={<Product/>}></Route>
                  <Route path='/brands/:name/:id' element={<Brand/>}></Route>   
                  <Route path='/categories' element={<CategoryList/>}></Route>
                  <Route path='/categories/:name/:id' element={<Category/>}></Route>
                  <Route path='/tags' element={<TagLists/>}></Route>
                  <Route path='/tags/:name/:id' element={<Tag/>}></Route>
                  <Route path='/types/:type' element={<TypeList/>}></Route>
                  <Route path='/types/:type/:id' element={<Type/>}></Route>
                  <Route path="/checkout" element={<CheckoutPage />} /> 
                  <Route path='/*' element={ <NotFound />}/>    
                </Route>            
            </Routes>
          </UserContext.Provider>     
          </BrowserRouter>
      </div>
    )
}

export default Routers;