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

export default function ReachAndEngagement({
  startDate,
  endDate,
  loading,
  setLoading,
  json,
}) {
  const reachAndEngagement = json?.reachAndEngagementDetails;
  const data = {
    labels: reachAndEngagement?.viewsTrend?.data?.map(reachAndEngagementObj => moment(reachAndEngagementObj.date).format("MMM D")),
    datasets: [{
        data: reachAndEngagement?.viewsTrend?.data?.map(reachAndEngagementObj => reachAndEngagementObj.value1),
        borderColor: '#4BC0C0',
        tension: 0.4,
    }]
  }
  const options = {
    maintainAspectRation: true,
    scales: {
      x: { grid: { display: false } }, 
      y: { beginAtZero: true },
    }
  }

  return (
    <div className='component'>
      <div className='main-div'>
        <span className='primary-title'>Reach &#38; Engagement</span> <br/>
        <span className='primary-date'>
          {moment(startDate).format("MMM D")}-
          {moment(endDate).format("MMM D, YYYY")}
        </span>
      </div>
      {!loading ?
        <div className='secondary-div'>
          <span className='secondary-title'>Views</span> <br/>
          <span className='secondary-value'>{ reachAndEngagement?.viewsTrend?.value/10 ?? reachAndEngagement?.viewsTrend?.value } M</span> <br/>
          <span className='secondary-percentage'>
            { reachAndEngagement?.viewsTrend?.change.value > 0 ? '+' : ''}
            { reachAndEngagement?.viewsTrend?.change?.percentage }%
          </span> <br/> 
          <hr className='secondary-underline' />
          <Line 
            data={data}
            options={options}
          />
        </div>
        : <ClipLoader loading={loading} size={150} css={override}/>
      }
    </div>
  )
}
