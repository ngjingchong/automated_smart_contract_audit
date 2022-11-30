import complete from './../images/complete.svg';
import React, { useEffect } from "react";

function AuditReport() {
  useEffect(() => {
    fetch("/data"
    ).then(
      res => res.json()
    ).then(
      data => {
        console.log(data)
      }
    ).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  })

  return (
    <div className="App">
      <img src={complete} alt="completion-logo" />
      <h5 style={{color: "#19A81F"}}>
        Smart Contract Audit Report is Ready !
        <br /> 
        <em>Click Here</em>
      </h5>
    </div>
  )
}

export default AuditReport;