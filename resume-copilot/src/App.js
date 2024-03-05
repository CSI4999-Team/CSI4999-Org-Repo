import React, { useState } from "react";
import LeftBar from "./components/LeftBar";
import UploadForm from './components/UploadForm';
import ReactMarkdown from 'react-markdown';
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
    alert("Resume and job description submitted!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAnalysisComplete = (analysisResult) => {
    // Display in chunks
    const chunkSize = 5;
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < analysisResult.length) {
        const nextChunkEndIndex = Math.min(currentIndex + chunkSize, analysisResult.length);
        const nextChunk = analysisResult.substring(currentIndex, nextChunkEndIndex);
        setAnalysisResult(prevResult => prevResult + nextChunk);
        currentIndex += chunkSize;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  return (
    <div className="App">
      <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <header className="App-header">
          {/* Navbar content */}
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
            {/* <input
              className="input-button"
              type="file"
              onChange={handleFileChange}
            /> */}
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
          {/* Display the analysis result with ReactMarkdown inside a styled div */}
          {analysisResult && (
            <div className="analysisResultMarkdownContainer">
              <ReactMarkdown children={analysisResult} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
