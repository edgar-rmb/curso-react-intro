import React from "react";

function useLocalStorage(itemName, initialValue) {
    
    const [item, setItem] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => { 
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;
    
                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }
    
                setItem(parsedItem);
                setLoading(false);
            } catch(error) {
                setLoading(false);
                setError(true);
            }

        }, 2000); 
    }, [itemName, initialValue]);

    const saveItem = (newItem) => {
        try {
            localStorage.setItem(itemName, JSON.stringify(newItem));
            setItem(newItem);
        } catch (error) {
            setError(true);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error 
    };
}

export  { useLocalStorage }

//const defaultMessage = [
//    { text: 'Uno One 1', completed: true },
//    { text: 'Dos Two 2', completed: false },
//    { text: 'Tres Three 3', completed: false },
//    { text: 'Cuatro Four 4', completed: false },
//    { text: 'Cinco Five 5', completed: false },
// ];

//localStorage.setItem('Tasks_V1', JSON.stringify(defaultMessage));
//localStorage.removeItem('Tasks_V1');