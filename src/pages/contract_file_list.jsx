import React from 'react'
import FileItem from './contract_file_item'

const FileList = ({ contracts, removeFile }) => {
  const deleteFileHandler = (_name) => {
      removeFile(_name)
  }
  console.log(contracts)
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