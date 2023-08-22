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
        You have completed <span>{completedTask}</span> of <span>{totalTask}</span> tasks
        </p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
      </div>
    </>
  );
}

export { Message }