import './basscss.css';
import Aside from './components/aside/aside'
import Main from './components/main/main'
import OverviewContextProvider from './contexts/overviewContext';
import ReadingsContextProvider from './contexts/readingsContext';

const App = () => {
  return (
    <div className="App background shadow-2 flex overflow-hidden">
      <OverviewContextProvider>
        <Aside />
      </OverviewContextProvider>
      {/* <ReadingsContextProvider>
        <Main />
      </ReadingsContextProvider> */}

    </div>
  );
}

export default App;
