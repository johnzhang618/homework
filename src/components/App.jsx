import React from 'react';
import Aside from './pages/Aside/Aside';
import Main from './pages/Main/Main';
import OverviewContextProvider from '../contexts/OverviewContext';
// import ReadingsContextProvider from '../contexts/ReadingsContext';

function App() {
  return (
    <div className="App background shadow-2 flex overflow-hidden">
      <OverviewContextProvider>
        <Aside />
      </OverviewContextProvider>
      {/* <ReadingsContextProvider> */}
      <Main />
      {/* </ReadingsContextProvider> */}

    </div>
  );
}

export default App;
