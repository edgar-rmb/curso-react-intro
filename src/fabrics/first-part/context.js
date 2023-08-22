import React, { useState, useRef, useCallback, createContext } from 'react';
import { useLocalStorage } from '../../hooks/uselocalstorage';

const TaskContext = createContext();

function TaskProvider({ children }) {
    const {
        item: allTask,
        saveItem: setAllTask,
        loading,
        error,
    } = useLocalStorage('Tasks_V1', []);

    const completedTask = allTask.filter(item => item.completed).length;
    //console.log(`La cantidad de tareas completadas: ${completedTask}`);

    const [searchValue, setSearchValue] = useState('');
    const searchAll = allTask.filter(item => 
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    //console.log(`Los usuarios buscan: ${searchValue}`);

    const saveTasks = useCallback((newTask) => {
        setAllTask(newTask);
    }, [setAllTask]);

    const addTask = useCallback((text) => {
        const newTasks = [...allTask, { text, completed: false }];
        saveTasks(newTasks);
    }, [allTask, saveTasks]);
    

    const taskCompleted = useCallback((text) => {
        const updatedTasks = allTask.map(item => 
            item.text === text ? { ...item, completed: !item.completed } : item
        );
        saveTasks(updatedTasks);
    }, [allTask, saveTasks]);

    const taskDeleted = useCallback((text) => {
        const updatedTasks = allTask.filter(item => item.text !== text);
        saveTasks(updatedTasks);
    }, [allTask, saveTasks]);

    const [visible, setVisible] = useState(true);
    const toggleVisibility = useCallback(() => {
        setVisible(prevVisible => !prevVisible);
    }, []);

    const [tasks, setTasks] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleReset = useCallback(() => {
        localStorage.removeItem('Tasks_V1');
        setAllTask([]);
        setSearchValue('');
        setVisible(true);
        setOpenModal(false);
    }, [setAllTask]);

    const resetTasksRef = useRef(handleReset);

    const [hasModalBeenShown, setHasModalBeenShown] = React.useState(false);

    const [hasClass, setHasClass] = React.useState(false);

    const handleButtonClick = () => {
        setHasClass(prevState => !prevState);
    };

    return (
        <TaskContext.Provider value={{
            loading,
            error,
            totalTask: allTask.length,
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
            resetTasksRef,
            handleReset,
            hasModalBeenShown,
            setHasModalBeenShown,
            hasClass,
            handleButtonClick,
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };