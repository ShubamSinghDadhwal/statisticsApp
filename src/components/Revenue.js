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

export default function Revenue({startDate, endDate}) {
  
  const [revenue, setRevenue] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('https://qorner-mock-server.herokuapp.com/stats?' + new URLSearchParams({
        startDate,
        endDate,
      }))
        .then((response) => response.json())
        .then(json => {
          setRevenue(json.revenueDetails);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [startDate, endDate]);

  const data = {
    labels: revenue?.estimatedRevenueTrend?.data?.map(revenueObj => moment(revenueObj.date).format("MMM D")),
    datasets: [{
        data: revenue?.estimatedRevenueTrend?.data?.map(revenueObj => revenueObj.value1),
        borderColor: '#4BC0C0',
        fill: false,
    }]
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
        <span className='primary-title'>Revenue</span> <br/>
        <span className='primary-date'>
          {moment(startDate).format("MMM D")}-
          {moment(endDate).format("MMM D, YYYY")}
        </span>
      </div>
      {!loading ?
        <div className='secondary-div'>
          <span className='secondary-title'>Estimated Revenue</span> <br/>
          <span className='secondary-value'>{ revenue?.estimatedRevenueTrend?.value } Lac</span> <br/>
          <span className='secondary-percentage'>
            { revenue?.estimatedRevenueTrend?.change.value > 0 ? '+' : '-'}
            { revenue?.estimatedRevenueTrend?.change?.percentage }%
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
