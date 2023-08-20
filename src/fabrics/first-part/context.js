import React from 'react';
import { useLocalStorage } from '../../hooks/uselocalstorage';

const TaskContext = React.createContext ();

function TaskProvider({children}) {

const {
    item: allTask,
    saveItem:  setAllTask,
    loading,
    error,
} = useLocalStorage('Tasks_V1', []);

const completedTask = allTask.filter(item => item.completed === true).length;
console.log(`La cantidad de tareas completadas: ${completedTask}`);

const totalTask = allTask.length;
console.log(`La cantidad total de tareas es: ${totalTask}`);

const [searchValue, setSearchValue] =  React.useState('');
console.log(`Los usuarios buscan: ${searchValue}`);

const searchAll = allTask.filter((item) =>{
    const itemText = item.text.toLocaleLowerCase();
    const searchText = searchValue.toLocaleLowerCase();
    return itemText.includes(searchText);
}
);

const saveTasks = (newTask) => { 
    setAllTask(newTask);
}

const addTask =(text) =>{
    const newTask = [...allTask];
    newTask.push({
        text,
        completed: false,
    });
    saveTasks(newTask);
};

const taskCompleted = (text) => { 
    const newTask = allTask.map(item => 
        item.text === text ? { ...item, completed: !item.completed } : item
    );
    saveTasks(newTask);
};

const taskDeleted = (text) => { 
    const newTask = allTask.filter(item => item.text !== text);
    saveTasks(newTask);
};

const [visible, setVisible] = React.useState(true);

const toggleVisibility = () => setVisible(prevVisible => !prevVisible);

const [tasks, setTasks] = React.useState([]);

const [openModal, setOpenModal] = React.useState(false);

const resetTasks = () => {
    const emptyTasks = [];
    saveTasks(emptyTasks); 
};

const resetTasksRef = React.useRef(resetTasks);

// Función que permite recetaer las tareas automaticamente al completar todas las tareas
//const [shouldReset, setShouldReset] = React.useState(false);

const [hasModalBeenShown, setHasModalBeenShown] = React.useState(false);


const handleReset = () => {
    
    localStorage.removeItem('Tasks_V1');
    setAllTask([]);
    setSearchValue('');
    setVisible(true); 
    setOpenModal(false);
    setHasModalBeenShown(false);

};

    return (
             <TaskContext.Provider value={{
                loading,
                error,
                totalTask,
                completedTask,
                searchValue,
                setSearchValue,
                searchAll,
                taskCompleted,
                taskDeleted,
                visible,
                setVisible,
                toggleVisibility,
                tasks,
                setTasks,
                openModal,
                setOpenModal,
                addTask,
                resetTasks,
                resetTasksRef,
                //shouldReset,
                //setShouldReset,
                hasModalBeenShown,
                setHasModalBeenShown,
                handleReset,
             }}>
                {children} 
             </TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider }