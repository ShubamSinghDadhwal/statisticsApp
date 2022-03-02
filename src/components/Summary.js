import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { useErrorHandler } from 'react-error-boundary'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

const override = css`
display: block;
margin: 0 auto;
border-color: #4BC0C0;
`;

export default function Summary({startDate, endDate, setStartDate, setEndDate}) {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('https://qorner-mock-server.herokuapp.com/stats?' + new URLSearchParams({
        startDate,
        endDate,
      }))
        .then((response) => response.json())
        .then(json => {
          setSummary(json.summary);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          handleError(error);
        });  
    };
    fetchData();
  }, [startDate, endDate]);
  return (
    <div className='summary-component'>
      <div className='main-div summary-div'>
        <div>
          <span className='primary-title'>Summary</span> <br/>
          <span className='primary-date'>
            {moment(startDate).format("MMM D")}-
            {moment(endDate).format("MMM D, YYYY")}
          </span>
        </div>
        <div>
          <DateRangePicker 
            appearance="subtle" 
            placeholder="Date Range" 
            style={{ width: 230 }}
            defaultValue={[new Date(startDate), new Date(endDate)]}
            onChange={(date) => {
              setStartDate(moment(date?.[0]).format("YYYY-MM-DD"));
              setEndDate(moment(date?.[1]).format("YYYY-MM-DD"));
          }}/>
        </div>
      </div>
       
      {!loading ?
        <div className='secondary-div summary-div'>
          <div className='summary-item'>
            <span className='secondary-title'>Subscribers</span>
            <span className='secondary-value'>{summary.subscribers}M</span>
          </div>
          <div className='summary-item'>
            <span className='secondary-title'>Views</span>
            <span className='secondary-value'>{summary?.views/10 ?? summary?.views}M</span>
          </div>
          <div className='summary-item'>
            <span className='secondary-title'>Revenue</span>
            <span className='secondary-value'>{summary.revenue}L</span>
          </div>
        </div> 
        : <ClipLoader loading={loading} size={150} css={override}/>
      }
    </div>
  )
}
