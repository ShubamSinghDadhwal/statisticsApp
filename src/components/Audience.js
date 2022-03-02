import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

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

export default function Audience({
  startDate,
  endDate,
  loading,
  setLoading,
  json,
}) {
  
  const audience = json?.audienceDetails;

  const data = {
    labels: audience?.viewsSubscriberVsNonSubscribersTrend?.data?.map(revenueObj => moment(revenueObj.date).format("MMM D")),
    datasets: [
      {
        data: audience?.viewsSubscriberVsNonSubscribersTrend?.data?.map(revenueObj => revenueObj.value1),
        borderColor: '#4BC0C0',
        label: 'Subscribed',
      },
      {
        data: audience?.viewsSubscriberVsNonSubscribersTrend?.data?.map(revenueObj => revenueObj.value2),
        borderColor: '#ff5c00',
        label: 'Non Subscribed',
      }
  ]
  }
  const options = {
    maintainAspectRation: true,
    scales: {
      x: { grid: { display: false } }, 
      y: { beginAtZero: true },
    },
  }

  return (
    <div className='component'>
      <div className='main-div'>
        <span className='primary-title'>Audience</span> <br/>
        <span className='primary-date'>
          {moment(startDate).format("MMM D")}-
          {moment(endDate).format("MMM D, YYYY")}
        </span>
      </div>
      {!loading ?
        <div className='secondary-div'>
          <span className='secondary-title'>Subscriber views vs Total views</span> <br/>
          <span className='secondary-value'>{ audience?.viewsSubscriberVsNonSubscribersTrend?.value } Lac</span> <br/>
          <span className='secondary-percentage'>
            { audience?.viewsSubscriberVsNonSubscribersTrend?.change.value > 0 ? '+' : ''}
            { audience?.viewsSubscriberVsNonSubscribersTrend?.change?.percentage }%
          </span> <br/> 
          <hr className='secondary-underline' />
          <Line 
            data={data}
            options={options}
          />
          <div className='legend-div-wrapper'>
            <div className='legend-div'>
              <span className="dot dot1"></span>
              <span>Subscribed</span>
            </div>
            <div className='legend-div'>
              <span className="dot dot2"></span>
              <span>Non Subscribed</span>
            </div>
          </div>
        </div> 
        : <ClipLoader loading={loading} size={150} css={override}/>
      }
    </div>
  )
}

