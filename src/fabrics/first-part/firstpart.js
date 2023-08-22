import React from 'react';
import { Logo } from './logo';
import { Title } from './title';
import { Message } from './message';
import { Search } from './search';
import { List } from './list';
import { Item } from './item';
import { Hidden } from './hidden';
import { FormTask } from './form-task';
import { Loading } from './loading';
import { Error } from './error';
import { Empty } from './empty';
import { Modal } from './modal';
import { Reset } from './reset';

import { TaskContext } from './context';

function FirstPartUI () {


// Función que permite no borrar las tareas al completar todas las tareas 
    const {
        visible,
        toggleVisibility,
        setOpenModal,
        totalTask,
        completedTask,
        hasModalBeenShown,
        setHasModalBeenShown,
        handleReset,
    } = React.useContext(TaskContext);

    React.useEffect(() => {
        if (totalTask > 0 && totalTask === completedTask && !hasModalBeenShown) {
            setOpenModal(true);
            setHasModalBeenShown(true);
        }
        
        if (hasModalBeenShown) {
            const timer = setTimeout(() => {
                setOpenModal(false);
            }, 2000);
            
            return () => {
                clearTimeout(timer);
            };
        }
    }, [totalTask, completedTask, hasModalBeenShown, setHasModalBeenShown, setOpenModal]);

// Función que permite recetaer las tareas automaticamente al completar todas las tareas
/* 
    const {
        visible,
        setVisible,
        setOpenModal,
        totalTask,
        completedTask,
        resetTasksRef,
        shouldReset,
        setShouldReset,
    } = React.useContext(TaskContext);

    React.useEffect(() => {
        if (shouldReset) {
            resetTasksRef.current();
            setShouldReset(false); // Después de resetear, establece shouldReset en false nuevamente
        }
    }, [shouldReset, resetTasksRef, setShouldReset]);

    React.useEffect(() => {
        if (totalTask > 0 && totalTask === completedTask) {
            setOpenModal(true);
    
            const timer = setTimeout(() => {
                setOpenModal(false);
                setShouldReset(true); // Establece shouldReset en true cuando el modal se cierre
            }, 2000);
    
            return () => clearTimeout(timer);
        }
    }, [totalTask, completedTask, setOpenModal, setShouldReset]);
*/

    return (
        <div className='section my-50'>
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-6 tasks txt-center">
                <Logo />
                <Title />
                <Message />
                <Search/>

                <TaskContext.Consumer>
                    {({
                        loading,
                        error,
                        searchAll,
                        taskCompleted,
                        taskDeleted,
                    }) => (
                        <List>
                            {loading && <Loading />}
                            {error && <Error />}
        
                            {(! loading && searchAll.length === 0) && <Empty />}
        
                            {searchAll
                                .filter(item => visible || !item.completed)
                                .sort((a, b) => {
                                    if (a.completed && !b.completed) return 1;  
                                    if (!a.completed && b.completed) return -1;
                                    return -1;
                                })
                                .map(item => (
                                    <Item 
                                        key={item.text}
                                        text={item.text} 
                                        completed={item.completed}
                                        onComplete={() => taskCompleted(item.text)}
                                        onDeleted={() => taskDeleted(item.text)}
                                    />
                            ))}
                        </List>
                    )}
                </TaskContext.Consumer>
                    
                <Hidden visible={visible} toggleVisibility={toggleVisibility} />

                <Reset onReset={handleReset} />

                <TaskContext.Consumer>
                    {({
                        openModal,
                        setOpenModal,
                    }) => (
                    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        Felicidades terminaste todas tus tareas
                    </Modal>
               )}
               </TaskContext.Consumer>

                </div>
                <div className="col-12 col-lg-6 d-flex j-content-center a-items-center">
                    <div className='card blur'>
                        <FormTask />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export { FirstPartUI }

