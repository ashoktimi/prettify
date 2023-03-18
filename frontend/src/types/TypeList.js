import React from "react";
import { Link } from "react-router-dom";
import './TypeList.css'

const TypeList = ({ types }) =>{
 
 
  return (
      <>
          {types.length > 1 ?
          <div className="TypeLists">
          {types.map(t => (
            <Link className="TypeList-link" to={`/types/${t.type}/${t.name}`} key={t.id}>
              {(t.name).trim().replace("_", " ")}
            </Link>           
          ))}
          </div>
          :
          <div className="TypeList">
            <Link className="TypeList-link" to={`/types/${types[0].type}/${types[0].name}`} key={types.id}>
              {(types[0].name).trim().replace("_", " ")}
            </Link> 
          </div>
          }
     </>
    );
}

export default  TypeList;