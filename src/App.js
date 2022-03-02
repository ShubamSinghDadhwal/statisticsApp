import { useEffect, useState } from 'react';
import Summary from './components/Summary';
import Revenue from './components/Revenue';
import ReachAndEngagement from './components/ReachAndEngagement';
import Audience from './components/Audience';
import Metadata from './components/Metadata';
import Fallback from './components/Fallback';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState('2021-02-01');
  const [endDate, setEndDate] = useState('2021-02-07');
  const [loading, setLoading] = useState(true);
  const [json, setJson] = useState();

  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('https://qorner-mock-server.herokuapp.com/stats?' + new URLSearchParams({
        startDate,
        endDate,
      }))
        .then((response) => response?.json())
        .then(json => {
          setJson(json);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          console.log("startDate, endDate", startDate, endDate);
          setLoading(false);
          handleError(error);
        });
    };
    fetchData();
  }, [startDate, endDate]);

  const errorHandler = (error, errorInfo) => {
    console.log("Logging error, errorInfo", error, errorInfo);
  }

  return (
    <div className="App">
     <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <Metadata 
          startDate={startDate}
          endDate={endDate}
          loading={loading} 
          json={json} 
          setJson={setJson}
        />
        <Summary 
          startDate={startDate} 
          endDate={endDate} 
          setStartDate={setStartDate} 
          setEndDate={setEndDate} 
          loading={loading} 
          json={json} 
          setJson={setJson}
        />
        <Revenue 
          startDate={startDate} 
          endDate={endDate} 
          loading={loading} 
          json={json} 
          setJson={setJson}
        />
        <ReachAndEngagement 
          startDate={startDate} 
          endDate={endDate} 
          loading={loading} 
          json={json} 
          setJson={setJson}
        />
        <Audience 
          startDate={startDate} 
          endDate={endDate} 
          loading={loading}
          json={json} 
          setJson={setJson}
        />
     </ErrorBoundary>
    </div>
  );
}

export default App;
