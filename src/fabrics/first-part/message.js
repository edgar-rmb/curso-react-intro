import React from "react";
import { TaskContext } from "./context";

function Message() {

const { totalTask, completedTask } = React.useContext(TaskContext);

  // Calculate completion rate
  const completionRate = totalTask > 0 ? (completedTask / totalTask) * 100 : 0;

  return (
    <>
      <div className="message">
        <p>
          Has completado <span>{completedTask}</span> de <span>{totalTask}</span> tareas
        </p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
      </div>
    </>
  );
}

export { Message }