import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";

function Item( props ) {
    return(
      <li className={`blur ${props.completed && 'completed'}`}>
        <div className={`btn-check ${props.completed && 'active'}`} onClick={props.onComplete}>
           <AiFillCheckCircle />
        </div>
        <div className={`tareas ${props.completed && 'completed'}`}> {props.text} </div>
        <div className="btn-trash deleted" onClick={props.onDeleted}>
            <AiFillMinusCircle />
        </div>
      </li>
    );
  }

  export { Item }