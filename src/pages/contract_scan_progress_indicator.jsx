import './contract_scan_progress_indicator.scss';
import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';

const Scan = ({percentage}) => {
  return (
    <div className="progress_bar_container">
      <CircularProgressbar 
        value={percentage} 
        text={`${percentage}%`} />
    </div>
  )
}

export default Scan;