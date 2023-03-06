import React, {useState, useContext, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PrettifyApi from "../api/api";
import BrandList from "../brands/BrandList";
import CategoryList from "../categories/CategoyList";
import TagList from "../tags/TagLIst";
import TypeList from "../types/TypeList";
import UserContext from "../auth/userContext";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './Toggler.css';


const Toggler = ({ logout, brands, categories, tags }) =>{

  const { currentUser } = useContext(UserContext);
  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [type, setType] = useState([]);
  const [showTypes, setShowTypes] = useState(false);
  const [value, setValue] = useState('nail'); 
  const [typeDetail, setTypeDetail] = useState([]);
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  useEffect(() =>{
    async function getBrands() {
    let types = await PrettifyApi.getAllTypes();     
    setType(types.types);
    }
    getBrands()   
  },[])

  const uniqueTypes = [...new Set(type.map(t => t.type))];

  useEffect(() => {
    async function fetchTypeDetail() {
      if (value) {
        const response = await PrettifyApi.getTypes(value);
        setTypeDetail(response.types);
      }
    }
    fetchTypeDetail();
  }, [value]);
  
  function handleTypeClick(event) {
    const key = event.target.getAttribute('data-key');
    setValue(key);
    setShowTypes(true);
  }

  const handleBrandsClick = () => {
    setShowBrands(true);
  };
  const handleCateoryClick = () => {
    setShowCategories(true);
  };
  const handleTagClick = () => {
    setShowTags(true);
  };
  const handleBackClick = () => {
    setShowBrands(false);
    setShowCategories(false);
    setShowTags(false);
    setShowTypes(false);
  };

    return(
        <>
        <Navbar style={{ backgroundColor: '#C16FB8', padding: '1rem', height: '4rem'}}/>
        <Navbar  expand='bg' className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`}  />
            <div className="NavBar-name-div">
              {currentUser ? 
                <Link to="/products" className="NavBar-name">Prettify</Link> 
                :               
                <Link to="/" className="NavBar-name">Prettify</Link>
              }
            </div>
            {currentUser ?
            <>
            <Navbar.Brand>
            <Link to="/cart">
            <div className="nav-bag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-handbag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
              </svg>
              <span className="bag-quantity">
                <span>{ cartTotalQuantity }</span>
              </span>
            </div>
            </Link>
            </Navbar.Brand>
            <Navbar.Brand >
              <Link to="/" onClick={logout} className='NavBar-logout'>Log out</Link>
            </Navbar.Brand>  
            </>
             :
            <>
             <Navbar.Brand>
              <Link className="NavBar-link" to="/login">Login</Link>
             </Navbar.Brand>
             <Navbar.Brand>
              <Link className="NavBar-link" to="/signup">Sign Up</Link>
             </Navbar.Brand>
             </>
             }
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="start"
            >
            {currentUser ?
              <>
              <Offcanvas.Header closeButton>
                {(brands.length > 0 || categories.length || tags.length> 0 || typeDetail.length > 0) && (showBrands || showCategories || showTags || showTypes)&& (
                  <Button onClick={handleBackClick}> ← </Button>
                )}
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Prettify
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              {brands.length > 0  && showBrands ? (    
               <BrandList brands={brands} />
              ) : (categories.length > 0 && showCategories) ? (
               <CategoryList categories={categories} />
              ): (tags.length > 0 && showTags) ?(
               <TagList tags={tags}/>
              ):(typeDetail.length > 0 && showTypes)?(
               <TypeList types={typeDetail}/>
              ):
              <ul style={{ listStyle: 'none'}} >
                <li><Link to="/products"  >ALL</Link></li>
                <li><Link to="/shopping" >Shopping</Link></li>
                {uniqueTypes.map(type => (
                  <li key={type}>
                    <Link data-key={type} onClick={handleTypeClick}>{type.toUpperCase()}</Link>
                  </li>
                ))}
                <li><Link onClick={handleBrandsClick}> BRANDS </Link></li>
                <li><Link onClick={handleCateoryClick} >CATEGORY</Link></li>
                <li><Link onClick={handleTagClick} >TAGS</Link></li>
              </ul>
              }
              <Link  to="/" onClick={logout} >LOG OUT</Link>
              </Offcanvas.Body>
              </>
              : <p>Please login to see.</p>}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    )
}

export default Toggler;


