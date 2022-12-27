import './contract_scan_progress_indicator.scss';
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';

const Scan = ({percent, setPercent}) => {
  const [percentage, setPercentage] = useState(percent)

  useEffect(() => {
    if(percentage !== 100) {
      const remaining_percentage = 100 - percentage
      // console.log("remaining => " + remaining_percentage)

      const new_percentage = Math.trunc((percentage + (remaining_percentage*0.3)))
      if (new_percentage < 100) {
        // console.log("new => " + new_percentage)
        setTimeout(() => setPercentage(new_percentage), 1000);
        if (new_percentage === 97){
          setTimeout(() => setPercentage(100), 1000);
        }
      }  
    } else {
      setPercent(percentage)
    }
  },[percentage])

  useEffect(() => {
    document.getElementsByClassName("_3CDiP")[0].style.display = "none"
  },[])

  return (
    <div className="progress_bar_container">
      <CircularProgressbar 
        value={percentage} 
        text={`${percentage}%`} />
    </div>
  )
}

export default Scan;