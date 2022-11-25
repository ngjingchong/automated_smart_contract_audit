import complete from './../images/complete.svg';
import React from "react";

function AuditReport() {
    //special of jsx file is html code can be store in to var for processing
    var file = <code >src/pages/contract_audit_report.jsx</code>;

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