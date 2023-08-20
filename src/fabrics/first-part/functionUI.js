import React from 'react';
import { FirstPartUI } from './firstpart';
import { TaskProvider } from './context';

//inital First Part
function FirstPart() {

    return(
        <TaskProvider>
            <FirstPartUI />
       </TaskProvider>
    );
  }

export { FirstPart }