import React, {
  createContext, useReducer, useEffect, useMemo,
} from 'react';
import { overviewReducer } from '../reducers/overviewReducer';
import { getOverviewData } from '../services/overview';

export const OverviewContext = createContext();

function OverviewContextProvider(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [overview, dispatch] = useReducer(overviewReducer, [], () => {
    const localData = localStorage.getItem('overview');
    return localData ? JSON.parse(localData) : [];
  });
  const overviewMemo = useMemo(() => ({ overview, dispatch }), [overview]);

  useEffect(() => {
    const fetchData = async () => {
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
    <OverviewContext.Provider value={overviewMemo}>
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewContextProvider;
