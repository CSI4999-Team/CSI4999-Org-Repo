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
  const [inputMethod, setInputMethod] = useState(null); // 'url' or 'description'
  const [confirmSkip, setConfirmSkip] = useState(false); // New state to track confirmation of skip



  /* Functions */

  /* BACK BUTTON FUNCTIONALITY */
  const handleBack = () => {
    // If the user is on the step where they input the URL or description,
    // or they have proceeded to the upload form, let them go back to the choice selection.
    if (currentStep === 2 || currentStep === 3) {
      setCurrentStep(1);
      setInputMethod(null); // Reset the input method choice
    } else if (currentStep === 4) { // If they are viewing the results, let them go back to the upload form.
      setCurrentStep(3);
    }
    // Add more conditions as needed depending on your app's flow.
    // if skip but then change mind, set confirm skip back to false
    if (currentStep === 2 && inputMethod === 'general') {
      setConfirmSkip(false);
    }
  };
  
  /* Handle for if Skip for general feedback */
const handleSkip = () => {
  const userConfirmed = window.confirm("Are you sure you want to skip and receive general feedback?");
  if (userConfirmed) {
    setConfirmSkip(true); // User has confirmed they want to skip
    setInputMethod('general'); // Set the input method to 'general' for clarity in logic
    setCurrentStep(3); // Directly move to the resume upload step
  }
};

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("job description submitted");
    setCurrentStep(3);
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

  // Before return statement in App function
  const renderInputChoice = () => {
    return (
      <div className="choices-container">
        <div className="main-choices">
          <button className="choice-button left" onClick={() => { setInputMethod('url'); setCurrentStep(2); }}>Use a URL</button>
          <button className="choice-button right" onClick={() => { setInputMethod('description'); setCurrentStep(2); }}>Copy Paste a Job Description</button>
        </div>
        <div className="skip-choice">
          <button className="skip-button" onClick={() => { setInputMethod('general'); setCurrentStep(2); }}>Skip / General Feedback</button>
        </div>
      </div>
    );
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
          <div className="toggle-button" onClick={toggleSidebar}>
            <img
              src="./arrow-right.svg"
              alt="An arrow"
              style={{ transform: sidebarOpen ? "scaleX(-1)" : "scaleX(1)" }}
            />
          </div>
          <main className="App-main">
            <LeftBar isOpen={sidebarOpen} />
            <div
              className="exp"
              style={{
                backgroundColor: "#23272e",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <h3 className="Welcome-Words">Welcome to</h3>
              <h1 className="Resume-Title">Resume Co-Pilot</h1>
            </div>
            <div className="transition-container">
            <TransitionGroup component={null}>
              {currentStep === 1 && !inputMethod && (
                <CSSTransition key={currentStep} timeout={1000} classNames="fade">
                  {renderInputChoice()}
                </CSSTransition>
              )}
              {currentStep === 2 && (
                <CSSTransition key="inputChoice" timeout={1000} classNames="fade">
                  <div>
                    {inputMethod === 'url' && (
                      <div>
                        <input
                          className="urlInput"
                          type="text"
                          placeholder="Enter URL here"
                        />
                        <button onClick={() => {
                          alert("To use the URL scraping feature is currently unavailable. Please manually copy-paste your job description.");
                          handleBack(); // Redirect back to the main page or step
                        }}>Submit</button>
                      </div>
                    )}
                    {inputMethod === 'description' && (
                      <div>
                        <form onSubmit={handleSubmit}>
                          <textarea
                            placeholder="Paste job description here"
                            value={jobDescription}
                            onChange={handleDescriptionChange}
                          />
                          <button type="submit" className="submit-button">Submit</button>
                        </form>
                      </div>
                    )}
                    {inputMethod === 'general' && !confirmSkip && (
                      <CSSTransition key="confirmSkip" timeout={1000} classNames="fade">
                        <div>
                          <p>Are you sure you want to proceed without specific job details? You will receive general feedback on your resume.</p>
                          <button onClick={() => { setConfirmSkip(true); setCurrentStep(3);}}>Yes, proceed</button>
                        </div>
                      </CSSTransition>
                    )}
                    <button className="back-button" onClick={handleBack}>Back</button>
                  </div>
                </CSSTransition>
              )}
              {currentStep === 3 && !analysisResult &&(
                <CSSTransition key={isUploading ? "loading" : "uploadForm"} timeout={1000} classNames="fade">
                  <div>
                    {!isUploading ? (
                      <UploadForm onAnalysisComplete={handleAnalysisComplete} onStartUploading={startUploading} jobDescription={jobDescription} confirmSkip={confirmSkip}/>
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