import complete from './../images/complete.svg';
import React, { useEffect } from "react";

function AuditReport({redirectHandler}) {
  return (
    <div className="App auditing_report">
      <img src={complete} alt="completion-logo" />
      <h5 style={{color: "#19A81F"}}>
        Smart Contract Audit Report is Ready !
        <br /> 
        <a style={{"text-decoration":"underline"}} onClick={() => redirectHandler()}>Click Here</a>
      </h5>
    </div>
  )
}

export default AuditReport;