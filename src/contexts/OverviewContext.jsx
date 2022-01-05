import React, { createContext, useReducer, useEffect } from "react";
import overviewReducer from "../reducers/overviewReducer";
import { getOverviewData } from "../services/overview";

export const OverviewContext = createContext();

function OverviewContextProvider(props) {
  const { children } = props;
  const [overview, dispatch] = useReducer(overviewReducer, [], () => {
    const localData = localStorage.getItem("overview");
    return localData ? JSON.parse(localData) : [];
  });
  const value = React.useMemo(
    () => ({
      overview,
      dispatch,
    }),
    [overview]
  );

  useEffect(async () => {
    const queryData = await getOverviewData();
    dispatch({
      type: "UPDATE_OVERVIEW",
      overview: queryData,
    });
    localStorage.setItem("overview", JSON.stringify(queryData));
  }, []);

  return (
    <OverviewContext.Provider value={value}>
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewContextProvider;
