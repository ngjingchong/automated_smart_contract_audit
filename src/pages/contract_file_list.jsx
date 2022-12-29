import React, { useState, useEffect } from 'react'
import FileItem from './contract_file_item'

const FileList = ({ removeFile, getContracts }) => {
  const [contracts, setContracts] = useState([])

  const deleteFileHandler = (_name) => {
    removeFile(contracts.filter(f => f.name !== _name))
    setContracts(contracts.filter(f => f.name !== _name))
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setContracts(getContracts())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (contracts.length > 0){
    return (
      <aside>
        <p>Files Uploaded</p>
        <ul>
          {
            contracts &&
            contracts.map(f => (<FileItem
              key={f.name}
              file={f}
              deleteFile={deleteFileHandler} />))
          }
        </ul>
      </aside>
    )
  } else {
    return (
      <></>
    )
  }
}

export default FileList