import React, { createContext, useReducer, useEffect } from 'react';
import overviewReducer from '../reducers/overviewReducer';
import getOverviewData from '../services/overview';

export const OverviewContext = createContext();

function OverviewContextProvider(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [overview, dispatch] = useReducer(overviewReducer, [], () => {
    const localData = localStorage.getItem('overview');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const queryData = await getOverviewData();
      dispatch({
        type: 'UPDATE_OVERVIEW',
        overview: queryData,
      });
      localStorage.setItem('overview', JSON.stringify(queryData));
    };
    fetchData();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <OverviewContext.Provider value={{ overview, dispatch }}>
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewContextProvider;
