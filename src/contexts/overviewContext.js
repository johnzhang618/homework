import React, { createContext, useReducer, useEffect } from 'react';
import { overviewReducer } from '../reducers/overviewReducer';
import { getOverviewData } from '../service/overview';

export const OverviewContext = createContext();

const OverviewContextProvider = (props) => {
    const [overview, dispatch] = useReducer(overviewReducer, [], () => {
        return getOverviewData();
    });
    console.log(overview)
    useEffect(() => {
        localStorage.setItem('overview', JSON.stringify(overview));
    }, [overview]);
    return (
        <OverviewContext.Provider value={{ overview, dispatch }}>
            {props.children}
        </OverviewContext.Provider>
    );
}

export default OverviewContextProvider;