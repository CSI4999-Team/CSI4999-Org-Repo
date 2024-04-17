import React, { useState, useRef } from "react";
import "./UploadForm.css";
import { useAuth0 } from "@auth0/auth0-react";

function UploadForm({ onAnalysisComplete, onStartUploading, jobDescription, confirmSkip, setPdfBlob, outputMethod }) {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth0();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileURL(URL.createObjectURL(selectedFile));
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setFileURL(URL.createObjectURL(droppedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }

    // Signal the start of the uploading process
    onStartUploading(); // Trigger loading state in parent component

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Extract resume text from the uploaded PDF file
      const parseResponse = await fetch("http://localhost:8000/api/parse_pdf/", {
        method: "POST",
        body: formData,
      });
      const parseData = await parseResponse.json();
      const resumeText = parseData.extracted_text;

      // Step 2: Analyze the extracted resume text
      const fileReader = new FileReader();
      fileReader.onload = async function(event) {
        const pdfBase64 = event.target.result.split(',')[1];
        const analyzeResponse = await fetch("http://localhost:8000/api/analyze_resume/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            resume_text: resumeText,
            confirm_skip: confirmSkip,
            job_desc: jobDescription,
            output_method: outputMethod,
            pdf_base64: pdfBase64,
            user_id: user.sub
          }),
        });
        
        if (outputMethod == 'text') {
          const analyzeData = await analyzeResponse.json();
          // Call the callback with the analysis result
          onAnalysisComplete(analyzeData.response);
        } else {
          const pdfBlob = await analyzeResponse.blob();
          setPdfBlob(pdfBlob)
        }
      }
      fileReader.readAsDataURL(file);
      
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const preventDefaultBehavior = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} onDragOver={preventDefaultBehavior} onDrop={handleFileDrop}>
        {fileURL ? (
          <object type="application/pdf" data={fileURL} width="100%" height="500" aria-label="Uploaded PDF preview">
            PDF Viewer not available. You can download the file <a href={fileURL} download>here</a>.
          </object>
        ) : (
          <div className="drop-area" onClick={triggerFileInput}>
            <p>Drag and drop your PDF file here or click to select</p>
            <input ref={fileInputRef} type="file" id="fileInput" onChange={handleFileChange} accept=".pdf" style={{ display: "none" }} />
          </div>
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadForm;
