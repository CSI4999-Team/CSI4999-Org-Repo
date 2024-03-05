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
  // instead of doing character by character lets display in chunks
  const chunkSize = 5; // set chunk size
  let currentIndex = 0; // initialize at zero so we dont lose any data

  const interval = setInterval(() => {
    if (currentIndex < analysisResult.length) {
      // determine the next chunk's end index
      const nextChunkEndIndex = Math.min(currentIndex + chunkSize, analysisResult.length);
      // get the next chunk of text
      const nextChunk = analysisResult.substring(currentIndex, nextChunkEndIndex);
      // update the state with the new chunk appended
      setAnalysisResult(prevResult => prevResult + nextChunk);
      // update currentIndex to the end of the last chunk processed
      currentIndex += chunkSize;
    } else {
      // once all chunks have been processed, clear the interval
      clearInterval(interval);
    }
  }, 50); // Aajust the delay as needed, smaller number = "faster" feel to output
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
