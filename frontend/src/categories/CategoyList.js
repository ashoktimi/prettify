import React from "react";
import { Link } from "react-router-dom";
import './CategoryList.css'

const CategoryList = ({ categories, handleCatHover }) =>{


    return (
      <>
      {categories && handleCatHover ?
      <div> 
          <ul className="CategoryList-column">
            {categories.map(c => (
              <li className="CategoryList-li" key={c.id} onClick={handleCatHover}>
                <Link className="CategoryList-link" to={`/categories/${(c.name).trim()}/${c.id}`} key={c.id}>
                  {(c.name).replace("_", " ")}
                </Link> 
              </li>          
          ))}
          </ul>
        </div>
        :
        <ul className="Categorylist-toggler-ul">
          {categories.map(c => (
            <li key={c.id}><Link to={`/categories/${c.name}/${c.id}`}>{c.name}</Link></li>
          ))}
        </ul>    
      }  
    </> 
  );
}

export default  CategoryList;