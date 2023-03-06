import React from "react";
import { Link } from "react-router-dom";
import './TypeList.css'

const TypeList = ({ types }) =>{

    return (
      <>
          {types.length > 1 ?
          <div>
          {types.map(t => (
            <Link className="TypeList-link" to={`/types/${t.type}/${t.name}`} key={t.id}>
              <h1 >{(t.name).trim().replace("_", " ")}</h1>
            </Link>           
          ))}
          </div>
          :
          <Link className="TypeList-link" to={`/types/${types.type}/${types.name}`} key={types.id}>
          <h1 >{types[0].name}</h1>
          </Link> 
          }
     </>
    );
}

export default  TypeList;