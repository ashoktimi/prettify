import React from "react";
import { Link } from "react-router-dom";
import './BrandList.css'

/** Show page with list of brands.
 *
 * On mount, loads brands from API. 
 *
 * This is routed to at /brands
 */
const BrandList = ({ brands, handleHover }) =>{
    return (
      <>
      {brands && handleHover ?
        <div >
          <ul className="BrandList-column">
            {brands.map(b => (            
              <li className="BrandList-li" key={b.id} onClick={handleHover}>
                 <Link className="BrandList-link" to={`/brands/${(b.name).trim().replace(/ /g, "-")}/${b.id}`}>
                   {b.name}
                 </Link>  
              </li>       
            ))}
          </ul> 
        </div>
        :
        <ul className="Brandlist-toggler-ul">
          {brands.map(brand => (
          <li key={brand.id}><Link to={`/brands/${brand.name}/${brand.id}`}>{brand.name}</Link></li>
          ))}
        </ul>  
      }
      </>
    );
}

export default  BrandList;


