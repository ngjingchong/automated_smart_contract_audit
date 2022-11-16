import logo from './../logo.svg';
import './contract_uploader.css';
import React, {useCallback}  from "react";
import {useDropzone} from "react-dropzone";

function ContractUploader(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className='uploader_container'>
      <h5 className='container_title'>Upload Your Smart Contract</h5>
      {/* uploader */}
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or <span>click</span> to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    </div>
  );

    //special of jsx file is html code can be store in to var for processing
    // var file = <code >src/pages/contract_uploader.jsx</code>;

    // return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //             Edit {file} and save to reload.
    //         </p>
    //       </header>
    //     </div>
    // )
}

export default ContractUploader;