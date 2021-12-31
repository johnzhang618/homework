import React, { createContext, useReducer, useEffect } from 'react';
import { readingsReducer } from '../reducers/readingsReducer';

export const ReadingsContext = createContext();

const ReadingsContextProvider = (props) => {
    const [readings, dispatch] = useReducer(readingsReducer, [], () => {
        const localData = localStorage.getItem('readings');
        return localData ? JSON.parse(localData) : [];
    });
    useEffect(() => {
        localStorage.setItem('readings', JSON.stringify(readings));
    }, [readings]);
    return (
        <ReadingsContext.Provider value={{ readings, dispatch }}>
            {props.children}
        </ReadingsContext.Provider>
    );
}

export default ReadingsContextProvider;