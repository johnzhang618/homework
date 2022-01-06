import React, { createContext, useReducer, useEffect } from 'react';
import readingsReducer from '../reducers/readingsReducer';
import getReadings from '../services/readings';

export const ReadingsContext = createContext();

function ReadingsContextProvider(props) {
  const [chartState, dispatch] = useReducer(readingsReducer, [], () => {
    const localData = localStorage.getItem('readings');
    const range = 30;
    const unit = 'daily';
    return {
      unit,
      range,
      readings: localData ? JSON.parse(localData) : [],
    };
  });
  useEffect(async () => {
    const queryData = await getReadings();
    dispatch({
      type: 'UPDATE_READINGS',
      readings: queryData,
    });
    localStorage.setItem('readings', JSON.stringify(queryData));
  }, []);
  return (
    <ReadingsContext.Provider value={{ chartState, dispatch }}>
      {props.children}
    </ReadingsContext.Provider>
  );
}

export default ReadingsContextProvider;
