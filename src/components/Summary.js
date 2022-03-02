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

export default function Summary({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  loading,
  json,
}) {
  const summary = json?.summary;

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
