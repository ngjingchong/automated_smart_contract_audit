import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li
        className="file-item"
        key={file.name}>
        <FontAwesomeIcon icon={faFileAlt} />
        <p>{file.name}</p>
        <div className="actions">
          <FontAwesomeIcon 
            icon={faTrash}
            onClick={() => deleteFile(file.name)}
          />
        </div>
      </li>
    </>
  )
}

export default FileItem