import React, {
  createContext, useReducer, useEffect, useMemo,
} from 'react';
import { PropTypes } from 'prop-types';
import { overviewReducer } from '../reducers/overviewReducer';
import { getOverviewData } from '../services/overview';

export const OverviewContext = createContext();

function OverviewContextProvider(props) {
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
OverviewContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default OverviewContextProvider;
