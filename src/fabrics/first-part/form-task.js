import React from "react";
import { TaskContext } from "./context";
import { AiFillCaretUp } from "react-icons/ai";

function FormTask() {

  const {
    addTask,
    handleButtonClick,
  } = React.useContext(TaskContext);

  const [newTaskValue, setNewTaskValue] = React.useState('');

  const onChange = (event) => {
    setNewTaskValue(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (newTaskValue.trim() !== '') {
        addTask(newTaskValue);
        setNewTaskValue('');
    } else {
        // Aquí puedes mostrar un mensaje de error si deseas.
        console.error("La tarea no puede estar vacía.");
    }
  }
  
  return(
    <div className="area-add-task">
      <button className="btn-up-down" onClick={handleButtonClick}><AiFillCaretUp /></button>
      <form onSubmit={onSubmit}>
      <h2> Create new task </h2>
      <div className="form-task d-flex f-column mb-20">
        <label htmlFor="taskName">&nbsp; Task name </label>
        <input 
          id="taskName"
          placeholder="My first task"
          value={newTaskValue}
          onChange={onChange}
          aria-label="Nombre de la tarea"
        />
      </div>
      <button className="btn-created" type="submit"> + </button>
      </form>
    </div>
  );
}

export { FormTask }
