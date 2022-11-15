import logo from "../../images/ASCA_logo.png";
import "./Popup.css";
import React from 'react';

// export const getCurrentTabUId = (callback) => {
//   const queryInfo = { active: true, currentWindow: true };

//   chrome.tabs &&
//     chrome.tabs.query(queryInfo, (tabs) => {
//       callback(tabs[0].id);
//     });
// };

function Popup() {
//   const sendMessage = () => {
//     getCurrentTabUId((id) => {
//       id &&
//         chrome.tabs.sendMessage(id, {
//           value: "openPopup",
//         });
//       window.close();
//     });
//   };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <button onClick={sendMessage}>Open popup</button> */}
        <a
          className="App-link"
          href="http://localhost:3000/welcome"
          target="_blank"
          rel="noopener noreferrer"
        >
          Welcome
        </a>
        <a
          className="App-link"
          href="http://localhost:3000/dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard
        </a><a
          className="App-link"
          href="http://localhost:3000/audit_process"
          target="_blank"
          rel="noopener noreferrer"
        >
          Audit
        </a>
      </header>
    </div>
  );
}

export default Popup;