import logo from './../logo.svg';
import './contract_uploader.scss';
import React, { useCallback, useEffect, useState }  from "react";
import {useDropzone} from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const ContractUploader = ({files, filesHandler, removeFile}) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({   
    maxFiles: 10,
    accept: {
      'application/pdf': [],
      'text/plain': [],
      'image/jpeg': [],
      'image/png': []
    }
  });

  //delete file
  const deleteFileHandler = (_name) => {
    // axios.delete(`http://localhost:8080/upload?name=${_name}`)
    //     .then((res) => removeFile(_name))
    //     .catch((err) => console.error(err));
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <li
      className="file-item"
      key={file.name}>
      <FontAwesomeIcon icon={faFileAlt} />
      <p>{file.name}</p>
      <div className="actions">
        <div className="loading"></div>
        <FontAwesomeIcon 
          icon={faTrash}
          onClick={() => deleteFileHandler(file.name)}
          />
      </div>
      {
        filesHandler(files)
      }
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // <li key={file.path} className="denied">
    //   {file.path} - {file.size} bytes
    //   <ul>
    //     {errors.map(e => (
    //       <li key={e.code}>{e.message}</li>
    //     ))}
    //   </ul>
    // </li>
    <li
      className="file-item rejected"
      key={file.name}>
      <FontAwesomeIcon icon={faFileAlt} />
      <p>{file.name}</p>
    </li>
  ));

  function acceptedFileList() {
    if (acceptedFiles.length > 0 ) {
      return (
        <div>
          <p>Files Uploaded</p>
          <ul>{acceptedFileItems}</ul>
        </div>
      )
    }
  };
  function fileRejectionList() {
    if (fileRejections.length > 0 ) {
      return (
        <div>
          <p >Files Rejected</p>
          <ul>{fileRejectionItems}</ul>
        </div>
      )
    }
  };

  return (
    <div className='uploader_container'>
      <h5 className='container_title'>Upload Your Smart Contract</h5>
      {/* uploader */}
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or <span>click</span> to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
          {acceptedFileList()}
          {fileRejectionList()}
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