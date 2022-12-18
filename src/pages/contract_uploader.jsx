import './contract_uploader.scss';
import React, { useCallback }  from "react";
import {useDropzone} from "react-dropzone";

const ContractUploader = ({setContractsHandler}) => {
  const onDrop = useCallback((acceptedFiles) => {
    var acceptedFilesTemp = []

    // filter all the files drop to accept only *.sol
    acceptedFiles.map(file => {
      if (file.path.split(".")[1] === "sol"){
        acceptedFilesTemp.push(file)
      }
    })
    
    setContractsHandler(acceptedFilesTemp);
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({   
    maxFiles: 10  ,
    onDrop
  });

  return (
    <div className='uploader_container'>
      <h5 className='container_title'>Upload Your Smart Contract</h5>
      {/* uploader */}
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or <span>click</span> to select files</p>
          <em>(Only *.sol file will be accepted)</em>
        </div>
      </section>
    </div>
  );
}

export default ContractUploader;