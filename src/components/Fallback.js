import React from 'react';
import '../App.css';

export default function Fallback() {
  return (
    <div className='fallbackUI'>
      <h3>Server Responded with a Invalid Date Range, Refresh and Please try with some different values.</h3>
    </div>
  )
}
