import React, { useState } from "react";
import "./UploadForm.css";

function UploadForm({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Extract resume text from the uploaded PDF file
      const parseResponse = await fetch(
        "http://localhost:8000/api/parse_pdf/",
        {
          method: "POST",
          body: formData,
        }
      );
      const parseData = await parseResponse.json();
      const resumeText = parseData.extracted_text;

      // Step 2: Analyze the extracted resume text
      const analyzeResponse = await fetch(
        "http://localhost:8000/api/analyze_resume/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume_text: resumeText }),
        }
      );
      const analyzeData = await analyzeResponse.json();

      // Call the callback with the analysis result
      if (onAnalysisComplete) {
        onAnalysisComplete(analyzeData.response);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const preventDefaultBehavior = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="upload-form-container">
      <form
        onSubmit={handleSubmit}
        onDragOver={preventDefaultBehavior}
        onDrop={handleFileDrop}
      >
        {fileURL ? (
          <object
            type="application/pdf"
            data={fileURL}
            width="100%"
            height="500"
          >
            PDF Viewer not available. You can download the file{" "}
            <a href={fileURL} download>
              here
            </a>
          </object>
        ) : (
          <div className="drop-area">
            <label htmlFor="fileInput" className="fileInputLabel">
              Drag and drop your PDF file here or click to select
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept=".pdf"
              className="fileInput"
            />
          </div>
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadForm;
