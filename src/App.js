import { useState } from 'react';
import Summary from './components/Summary';
import Revenue from './components/Revenue';
import ReachAndEngagement from './components/ReachAndEngagement';
import Audience from './components/Audience';
import Metadata from './components/Metadata';
import Fallback from './components/Fallback';
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';

function App() {
  const [startDate, setStartDate] = useState('2021-02-01');
  const [endDate, setEndDate] = useState('2021-02-07');

  const errorHandler = (error, errorInfo) => {
    console.log("Logging error, errorInfo", error, errorInfo);
  }

  return (
    <div className="App">
     <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <Metadata startDate={startDate} endDate={endDate}/>
        <Summary startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
        <Revenue startDate={startDate} endDate={endDate} />
        <ReachAndEngagement startDate={startDate} endDate={endDate} />
        <Audience startDate={startDate} endDate={endDate} />
     </ErrorBoundary>
    </div>
  );
}

export default App;
