import React, { createContext, useReducer, useEffect } from 'react';
import { readingsReducer } from '../reducers/readingsReducer';
import { getReadings } from '../service/readings';

export const ReadingsContext = createContext();

const ReadingsContextProvider = (props) => {
    const [chartState, dispatch] = useReducer(readingsReducer, [], () => {
        const
            localData = localStorage.getItem('readings'),
            range = 30,
            unit = "daily";
        return {
            unit: unit,
            range: range,
            readings: localData ? JSON.parse(localData) : []
        }
    });
    useEffect(async () => {
        const queryData = await getReadings()
        dispatch({
            type: "UPDATE_READINGS",
            readings: queryData
        })
        localStorage.setItem('readings', JSON.stringify(queryData));
    }, []);
    return (
        <ReadingsContext.Provider value={{ chartState, dispatch }}>
            {props.children}
        </ReadingsContext.Provider>
    );
}

export default ReadingsContextProvider;