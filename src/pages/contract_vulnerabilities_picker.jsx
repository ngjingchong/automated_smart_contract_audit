import logo from './../logo.svg';
import './contract_vulnerabilities_picker.scss';
import React from "react";

const VulnerabilityPicker = ({vulnerabilities}) => {
    const vulnerabilityAuditor = vulnerabilities && vulnerabilities.map(v => (
      <li
        id={v.id}
        className="vulnerability">
        <p>{v.name}</p>
      </li>
    ));

    function vulnerabilitiesAuditors() {
      if (vulnerabilities) {
        return (
          <aside>
            <ul className='vulnerability_col'>{vulnerabilityAuditor}</ul>
          </aside>
        )
      }
    };

    return (
        <div className="vulnerability_picker_container">
          {vulnerabilitiesAuditors()}
        </div>
    )
}

export default VulnerabilityPicker;