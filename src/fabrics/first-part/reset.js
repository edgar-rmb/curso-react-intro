import { AiFillDelete } from "react-icons/ai";

function Reset({ onReset }) {
    return(
      <div className="reset">
        <button className="btn-reset" onClick={onReset}><AiFillDelete /> </button>
      </div>
     
    );
  }

export { Reset }