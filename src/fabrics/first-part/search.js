import search from '../../assets/img/search.svg';
import React from "react";
import { TaskContext } from "./context";

function Search() {

  const {
    searchValue,
    setSearchValue,
  } = React.useContext(TaskContext)

    return(
      <div className='form-search'>
        <div className='area-search'>
          <input
          id='search'
          placeholder="Search..."
          value={ searchValue }
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          ></input>
          <button className="btn-search">  
            <img src={ search } alt="Buscar" />
          </button>
        </div>
      </div>
    );
}

export { Search };
