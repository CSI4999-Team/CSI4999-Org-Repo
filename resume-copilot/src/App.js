import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LeftBar from "./components/LeftBar";
import UploadForm from './components/UploadForm';
import ReactMarkdown from 'react-markdown';
import LogoutButton from './components/Logout';
import "./App.css";


function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0(); // These are from useAuth0
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
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
  
// throw Auth0 login page
React.useEffect(() => {
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }
}, [isLoading, isAuthenticated, loginWithRedirect]);

// Show loading state while Auth0 is loading
if (isLoading) return <div>Loading...</div>;


return (
  <div className="App">
    {isAuthenticated ? (
      <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <header className="App-header">
          {/* Other navbar content */}
          {isAuthenticated && <div className="logout-button-container"><LogoutButton /></div>}
        </header>
        <div className="toggle-button" onClick={toggleSidebar}></div>
        <main className="App-main">
          <LeftBar isOpen={sidebarOpen} />
          <h1>Resume Co-Pilot</h1>
          <input
            className="urlInput"
            type="text"
            placeholder="Enter URL here"
          />
          <form onSubmit={handleSubmit}>
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
          {analysisResult && (
            <div className="analysisResultMarkdownContainer">
              <ReactMarkdown>{analysisResult}</ReactMarkdown>
            </div>
          )}
        </main>
      </div>
    ) : (
      <div>Redirecting to login...</div>
    )}
  </div>
);
}

export default App;