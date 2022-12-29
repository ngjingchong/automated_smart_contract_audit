import './contract_uploader.scss';
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from 'react-bootstrap/Button';
import { StyleSheet } from 'react-native';
import Tour from 'reactour'

const ContractUploader = ({ setContractsHandler }) => {
  const onDrop = useCallback((acceptedFiles) => {
    var acceptedFilesTemp = []

    // filter all the files drop to accept only *.sol
    acceptedFiles.map(file => {
      if (file.path.split(".")[1] === "sol") {
        acceptedFilesTemp.push(file)
      }
    })

    setContractsHandler(acceptedFilesTemp);
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 10,
    onDrop
  });

  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      <div className='uploader_container'>
        <h5 className='container_title'>Upload Your Smart Contract</h5>
        {/* uploader */}
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or <span>click</span> to select files</p>
            <em>(Only *.sol file will be accepted)</em>
          </div>
        </section>
      </div>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      <Button style={styles.tourGuideButton} onClick={() => setIsTourOpen(true)}>Tour Guide</Button>
    </>
  );
}

const steps = [
  {
    selector: ".container",
    content: "Click here to upload your smart contract. Click Next Button below once uploaded.",
  },
];

const styles = StyleSheet.create({
  tourGuideButton: {
    fontWeight: "bold", backgroundColor: "#78909c", bottom: 0, margin: 20, position: "fixed", right: 20, borderRadius: "50%", height: 90, width: 90
  }
});
export default ContractUploader;