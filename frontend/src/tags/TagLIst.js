
import React from "react";
import { Link } from "react-router-dom";
import './TagList.css'

/** Show page with list of tags.
 *
 * On mount, loads tags from API. 
 *
 * This is routed to at /tags
 */
const TagLists = ({ tags, handleTagHover }) =>{
  return (
    <>
    {tags && handleTagHover ?
      <div>
          <ul className="TagLists-ul">
          {tags.map(t => (
            <li className="TagLists-li"  key={t.id} onClick={handleTagHover}>
            <Link className="TagLists-link" to={`/tags/${(t.name).trim().replace(/ /g, "-")}/${t.id}`} key={t.id}>
              {t.name}
            </Link> 
            </li>          
          ))}
        </ul>  
      </div> 
    :  
    <ul className="Taglist-toggler-ul">
      {tags.map(c => (
       <li key={c.id}><Link to={`/tags/${c.name}/${c.id}`}>{c.name}</Link></li>
     ))}
    </ul>
    }
    </>
  );
}

export default  TagLists;