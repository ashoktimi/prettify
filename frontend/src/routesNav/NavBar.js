import React, { useState, useEffect, useContext } from 'react';
import PrettifyApi from "../api/api";
import BrandList from "../brands/BrandList";
import CategoryList from "../categories/CategoyList";
import TagList from "../tags/TagLIst";
import 'bootstrap/dist/css/bootstrap.css';
import Toggler from './Toggler';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import UserContext from "../auth/userContext";
import { Navbar } from 'react-bootstrap';
import './NavBar.css';

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  // Merge similar state variables into a single object
  const [navBarData, setNavBarData] = useState({
    brands: [],
    categories: [],
    tags: [],
    types: { eyes: [], lips: [], face: [] },
    isHovered: false,
    isCategoryHovered: false,
    isTagHovered: false,
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
      <NavDropdown className="NavBar-dropdown" title={type.toUpperCase()}>
        {navBarData.types[type].map((t) => (
          <NavDropdown.Item key={t.name}>
            <Link to={`/types/${type}/${t.name}`} className="NavBar-dropdown-link">
              {t.name}
            </Link>
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  }

  return (
    <>
      <Toggler logout={logout} {...navBarData} renderNavItem={renderNavItem} />
      {currentUser && (
        <Navbar expand="md">
          <ul className="NavBar-ul">
            <li>
              <Link to="/products" className="NavBar-link">
                {' '}
                ALL{' '}
              </Link>
            </li>
            <li>
              <Link to="/types/nail/nail_polish" className="NavBar-link">
                {' '}
                NAIL
              </Link>
            </li>
            {renderNavItem('eyes')}
            {renderNavItem('lips')}
            {renderNavItem('face')}
            <li onMouseEnter={() => handleHover('isHovered')} onMouseLeave={() => handleHover('isHovered')}>
              <Link className="NavBar-link">BRANDS</Link>
              {navBarData.isHovered && <BrandList handleHover={() => handleHover('isHovered')} brands={navBarData.brands} />}
            </li>
            <li onMouseEnter={() => handleHover('isCategoryHovered')} onMouseLeave={() => handleHover('isCategoryHovered')}>
              <Link className="NavBar-link">CATEGORIES</Link>
              {navBarData.isCategoryHovered && <CategoryList handleCatHover={() => handleHover('isCategoryHovered')} categories={navBarData.categories} />}
            </li>
            <li onMouseEnter={() => handleHover('isTagHovered')} onMouseLeave={() => handleHover('isTagHovered')}>
              <Link className="NavBar-link">TAGS</Link>
              {navBarData.isTagHovered && <TagList handleTagHover={() => handleHover('isTagHovered')} tags={navBarData.tags} />}
            </li>
       </ul>
      </Navbar>
      )}
    </>
  );
}

export default NavBar;