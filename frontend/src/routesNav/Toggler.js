import React, {useState, useContext, useEffect} from "react";
import { Link } from 'react-router-dom';
import PrettifyApi from "../api/api";
import BrandList from "../brands/BrandList";
import CategoryList from "../categories/CategoyList";
import TagList from "../tags/TagLIst";
import TypeList from "../types/TypeList";
import UserContext  from "../auth/userContext";
import 'bootstrap/dist/css/bootstrap.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import './Toggler.css';




const Toggler = ({ logout, brands, categories, tags }) =>{

  const { currentUser, handleToggleOffcanvas} = useContext(UserContext);
  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [type, setType] = useState([]);
  const [showTypes, setShowTypes] = useState(false);
  const [value, setValue] = useState('nail'); 
  const [typeDetail, setTypeDetail] = useState([]);


  
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
        <Navbar expand='bg' style={{padding:0}}>
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`}/>
            <div className="NavBar-name-div">
              {currentUser ? 
                <Link to="/products" className="NavBar-name">Prettify</Link> 
                :               
                <Link to="/" className="NavBar-name" style={{marginLeft: "10rem"}}>Prettify</Link>
              }
            </div>
            {currentUser ?
            <>
            </>
             :
            <div style={{marginRight: '5rem'}}>
              <Link className="NavBar-auth_Btn" to="/login">Login</Link>  
              <Link className="NavBar-auth_Btn" to="/signup">Signup</Link>
             </div>
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
                  <button  onClick={handleBackClick} style={{border:'none', fontSize:'25px', backgroundColor:'white'}}> {`<`} </button>
                )}
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} style={{color:'purple', left:0, right:0, margin:'auto'}}>
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

              <ul className="Toggler-ul" >
                <li><Link to="/products"  >ALL</Link></li>
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
              </Offcanvas.Body>
              <Link className="Toggler-bag" onClick={handleToggleOffcanvas}>
                <AiOutlineShoppingCart size={30}/>
              </Link>
              <Link  to="/" className="Toggler-logout" onClick={logout} style={{marginBottom:'35px'}} >Log out</Link>      
              </>
              : <h3 className="Toggler-h3">Please login to see.</h3>}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    )
}

export default Toggler;