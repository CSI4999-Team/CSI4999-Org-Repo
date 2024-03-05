import React, { useState } from "react";
import LeftBar from "./components/LeftBar";
import UploadForm from './components/UploadForm';
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(""); // New state for analysis result
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add logic to process the file and job description
    alert("Resume and job description submitted!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close
  };

// "live" text for some reason wont display very first word incorrectly for some reason
// TODO: Fix "live" version and replace this static working version
const handleAnalysisComplete = (analysisResult) => {
  setAnalysisResult(analysisResult); // Display the result directly in the new text box
};

  return (
    <div className="App">
      <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <header className="App-header">
          {/* ...Navbar content... */}
        </header>
        <main className="App-main">
          <LeftBar isOpen={sidebarOpen} />
          <div className="toggle-button" onClick={toggleSidebar}>
            Toggle Sidebar
          </div>
          <h1>Resume Co-Pilot</h1>
          <input
            className="urlInput"
            type="text"
            placeholder="Enter URL here"
          />
          <form onSubmit={handleSubmit}>
            <input
              className="input-button"
              type="file"
              onChange={handleFileChange}
            />
            <textarea
              placeholder="Paste job description here"
              value={jobDescription}
              onChange={handleDescriptionChange}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <UploadForm onAnalysisComplete={handleAnalysisComplete} />
          {/* New text area for displaying the analysis result */}
          {analysisResult && (
            <textarea
              className="analysis-result-textarea"
              value={analysisResult}
              readOnly
              style={{ height: '600px' }} // Adjust the height as needed
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
