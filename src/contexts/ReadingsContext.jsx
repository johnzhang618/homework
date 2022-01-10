import React, {
  createContext, useReducer, useEffect, useMemo,
} from 'react';
import { PropTypes } from 'prop-types';
import { readingsReducer } from '../reducers/readingsReducer';
import { getReadings } from '../services/readings';

export const ReadingsContext = createContext();

function ReadingsContextProvider(props) {
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
  const chartMemo = useMemo(() => ({ chartState, dispatch }), [chartState]);

  useEffect(() => {
    const fetchData = async () => {
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
    <ReadingsContext.Provider value={chartMemo}>
      {children}
    </ReadingsContext.Provider>
  );
}
ReadingsContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ReadingsContextProvider;
