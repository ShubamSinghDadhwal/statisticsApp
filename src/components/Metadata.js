import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import logo from "../assets/youtube-logo.png";
import thumbnail from "../assets/youtube-thumbnail.jpg";
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

export default function Metadata({
  startDate,
  endDate,
  loading,
  setLoading,
  json,
}) {
  const metadata = json?.metadata;
  return (
    <div>
      <div className='navbar'>
        <span className='app-title'>Youtube Stats</span> <br/>
        <div>
          <img src={logo} height={100} width={100}></img>
        </div>
      </div>
      
      {!loading ?
        <div className='channel-details'>
          <img src={thumbnail} className="metadata-logo"></img>
          <div>
            <div className='metadata-channel-name'>{metadata.channelName}</div>          
            <div>
              <span className='metadata-subscriber-video-count'>{metadata.subscribersCount} subscribers</span>
              <span className='metadata-subscriber-video-count'>{metadata.videoCount} videos</span>
            </div>  
          </div>
        </div>
        : <ClipLoader loading={loading} size={100} css={override}/>
      }
    </div>
  )
}
