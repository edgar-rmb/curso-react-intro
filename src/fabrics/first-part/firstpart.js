import React, { useContext } from 'react';
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

function FirstPartUI() {
    const {
        visible,
        toggleVisibility,
        handleReset,
        loading,
        error,
        searchAll,
        taskCompleted,
        taskDeleted,
        openModal,
        setOpenModal,
        totalTask,
        completedTask,
        hasModalBeenShown,
        setHasModalBeenShown,
        hasClass,
    } = useContext(TaskContext);

    // Lista de tareas ordenadas y filtradas
    const filteredTasks = searchAll
        .sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return -1;
        })
        .filter(item => visible || !item.completed);


        React.useEffect(() => {
            if (totalTask > 0 && totalTask === completedTask && !hasModalBeenShown) {
                setOpenModal(true);
                setHasModalBeenShown(true);
            }
            
            if (hasModalBeenShown) {
                const timer = setTimeout(() => {
                    setOpenModal(false);
                }, 3000);
                
                return () => {
                    clearTimeout(timer);
                };
            }
        }, [totalTask, completedTask, hasModalBeenShown, setHasModalBeenShown, setOpenModal]);

    return (
        <div className='section my-50'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 tasks txt-center">
                        <Logo />
                        <Title />
                        <Message />
                        <Search />

                        <List>
                            {loading && <Loading />}
                            {error && <Error />}
                            {(!loading && filteredTasks.length === 0) && <Empty />}
                            
                            {filteredTasks.map(item => (
                                <Item 
                                    key={item.text}
                                    text={item.text} 
                                    completed={item.completed}
                                    onComplete={() => taskCompleted(item.text)}
                                    onDeleted={() => taskDeleted(item.text)}
                                />
                            ))}
                        </List>

                        <Hidden visible={visible} toggleVisibility={toggleVisibility} />
                        <Reset onReset={handleReset} />
                        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                            Felicidades terminaste todas tus tareas
                        </Modal>
                    </div>
                    <div className="col-12 col-lg-6 d-flex j-content-center a-items-center">
                        <div className={`card blur ${hasClass && 'up-down'}`}>
                            <FormTask />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { FirstPartUI };

