import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LeftBar from "./components/LeftBar";
import UploadForm from './components/UploadForm';
import ReactMarkdown from 'react-markdown';
import LogoutButton from './components/Logout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Functions */

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Resume and job description submitted!");
    setCurrentStep(2);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAnalysisComplete = (analysisResult) => {
    // Wait for the API call to finish and then process the result
    setTimeout(() => {
      setIsUploading(false); // Stop showing the loading screen
      setCurrentStep(3); // Move to the result display step

      // Initialize the "dripping" effect for displaying the analysis results
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
    }, 3000); // This delay simulates the wait time for the analysis to complete
  };

  const startUploading = () => {
    setIsUploading(true); // Start showing the loading screen immediately
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) return <div>Loading...</div>;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /* App Login returned to User */
  
  return (
    <div className="App">
      {isAuthenticated ? (
        <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <header className="App-header">
            {/* Other content */}
            <div className="menu-container">
              <button onClick={toggleMenu} className="hamburger-menu">☰</button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <a href="/manage-account">Manage Account</a>
                  <a href="/change-preferences">Change Preferences</a>
                  <LogoutButton />
                </div>
              )}
            </div>
          </header>
          <div className="toggle-button" onClick={toggleSidebar}></div>
          <main className="App-main">
            <LeftBar isOpen={sidebarOpen} />
            <h1>Resume Co-Pilot</h1>
            <div className="transition-container">
            <TransitionGroup component={null}>
              {currentStep === 1 && (
                <CSSTransition key={currentStep} timeout={1000} classNames="fade">
                  <div>
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
                  </div>
                </CSSTransition>
              )}
              {currentStep === 2 && (
                <CSSTransition key={isUploading ? "loading" : "uploadForm"} timeout={1000} classNames="fade">
                  <div>
                    {!isUploading ? (
                      <UploadForm onAnalysisComplete={handleAnalysisComplete} onStartUploading={startUploading} />
                    ) : (
                      // TODO: Make Dynamic Loading Screen
                      <div>Loading...</div> // Transition smooth to Loading... static
                    )}
                  </div>
                </CSSTransition>
              )}
              {currentStep === 3 && analysisResult && (
                <CSSTransition key="results" timeout={1000} classNames="fade">
                  <div className="analysisResultMarkdownContainer">
                    <ReactMarkdown>{analysisResult}</ReactMarkdown>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            </div>
          </main>
        </div>
      ) : (
        <div>Redirecting to login...</div>
      )}
    </div>
  );
}

export default App;  