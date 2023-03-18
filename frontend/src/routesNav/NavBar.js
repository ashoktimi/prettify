import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import PrettifyApi from "../api/api";
import BrandList from "../brands/BrandList";
import CategoryList from "../categories/CategoyList";
import TagList from "../tags/TagLIst";
import Toggler from './Toggler';
import Cart from "../cart/Cart";
import UserContext from "../auth/userContext";
import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.css';
import { Container,Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';


function NavBar({ logout }) {
  const { currentUser, handleToggleOffcanvas} = useContext(UserContext);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  // Merge similar state variables into a single object
  const [navBarData, setNavBarData] = useState({
    brands: [],
    categories: [],
    tags: [],
    types: { eyes: [], lips: [], face: [] },
    isHovered: false,
    isCategoryHovered: false,
    isTagHovered: false,
    isProfileHovered: false,
  });

  useEffect(() => {
    async function fetchData() {
      const { brands } = await PrettifyApi.getBrands();
      const { categories } = await PrettifyApi.getCategories();
      const { tagLists: tags } = await PrettifyApi.getTaglists();

      setNavBarData((prevData) => ({
        ...prevData,
        brands,
        categories,
        tags,
      }));
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTypes(type) {
      const { types } = await PrettifyApi.getTypes(type);
      setNavBarData((prevData) => ({
        ...prevData,
        types: { ...prevData.types, [type]: types },
      }));
    }

    fetchTypes('eyes');
    fetchTypes('lips');
    fetchTypes('face');
  }, []);

  // Extracted hover handlers to remove duplication
  const handleHover = (stateVar) => {
    setNavBarData((prevData) => ({
      ...prevData,
      [stateVar]: !prevData[stateVar],
    }));
  };

  function renderNavItem(type) {
    return (
      <NavDropdown className="NavBar-dropdown" title={type.toUpperCase()} >
        {navBarData.types[type].map((t) => (
          <NavDropdown.Item key={t.name}>
            <Link to={`/types/${type}/${t.name}`} className="NavBar-dropdown-link">
              {(t.name).trim().replace("_", " ")}
            </Link>
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  }


  return (
    <>
      <Navbar sticky='top' style={{ backgroundColor: '#C16FB8', padding: '1rem', height: '4rem'}}/>
      <Toggler logout={logout} {...navBarData} renderNavItem={renderNavItem} />
      <Cart />
      {currentUser && (
       <Navbar sticky='top' expand="lg">
        <Container >
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" disabled/> */}
        <Navbar.Collapse id="responsive-navbar-nav" >
 
          <Nav className="mr-auto" style={{ left:0, right:0, margin:'auto'}}>
            <Link to="/products" className="NavBar-link">ALL</Link>
            <Link to="/types/nail/nail_polish" className="NavBar-link">NAIL</Link>
            {renderNavItem('eyes')}
            {renderNavItem('lips')}
            {renderNavItem('face')}
            <Nav.Item onMouseEnter={() => handleHover('isHovered')} onMouseLeave={() => handleHover('isHovered')} style={{paddingTop:'5px'}}>
              <Link className="NavBar-link">BRANDS</Link>
              {navBarData.isHovered && <BrandList handleHover={() => handleHover('isHovered')} brands={navBarData.brands} />}
            </Nav.Item>
            <Nav.Item onMouseEnter={() => handleHover('isCategoryHovered')} onMouseLeave={() => handleHover('isCategoryHovered')} style={{paddingTop:'5px'}}>
              <Link className="NavBar-link">CATEGORIES</Link>
              {navBarData.isCategoryHovered && <CategoryList handleCatHover={() => handleHover('isCategoryHovered')} categories={navBarData.categories} />}
            </Nav.Item>
            <Nav.Item onMouseEnter={() => handleHover('isTagHovered')} onMouseLeave={() => handleHover('isTagHovered')} style={{paddingTop:'5px'}}>
              <Link className="NavBar-link">TAGS</Link>
              {navBarData.isTagHovered && <TagList handleTagHover={() => handleHover('isTagHovered')} tags={navBarData.tags} />}
            </Nav.Item>
            <Link className="Navbar-bag" onClick={handleToggleOffcanvas}>
              <AiOutlineShoppingCart size={30}/>
              <span className="bag-quantity">{cartTotalQuantity}</span>
            </Link>
            <NavDropdown className="Profile-dropdown" title={<CgProfile />} style={{marginTop: '10px'}}>
              <NavDropdown.Item>
                <Link to={'/'}className="NavBar-dropdown-link"> My Account </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={'/'}className="NavBar-dropdown-link"> Order History </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={'/'}className="NavBar-dropdown-link"> My WishList </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/" onClick={logout} className="Navbar-logout">Logout</Link>
        </Nav>

        </Navbar.Collapse>
        </Container>
       </Navbar>
      )}
    </>
  );
}

export default NavBar;