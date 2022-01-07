import React, { createContext, useReducer, useEffect } from 'react';
import readingsReducer from '../reducers/readingsReducer';
import getReadings from '../services/readings';

export const ReadingsContext = createContext();

function ReadingsContextProvider(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
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

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const queryData = await getReadings();
      dispatch({
        type: 'UPDATE_READINGS',
        readings: queryData,
      });
      localStorage.setItem('readings', JSON.stringify(queryData));
    };
    fetchData();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ReadingsContext.Provider value={{ chartState, dispatch }}>
      {children}
    </ReadingsContext.Provider>
  );
}

export default ReadingsContextProvider;
