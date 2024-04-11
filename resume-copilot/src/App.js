import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LeftBar from "./components/LeftBar";
import UploadForm from './components/UploadForm';
import ReactMarkdown from 'react-markdown';
import LogoutButton from './components/Logout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
// Import pages from components
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import TipsAndTricks from './components/TipsAndTricks';
import AboutUs from './components/AboutUs';

import UserProfile from "./components/UserProfile"

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputMethod, setInputMethod] = useState(null); // 'url' or 'description'
  const [confirmSkip, setConfirmSkip] = useState(false); // New state to track confirmation of skip
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [phase, setPhase] = useState(1); // 1 for first loading phase, 2 for second
  const [showLoadingBar, setShowLoadingBar] = useState(true); // Show or hide the loading bar
  const [userHistory, setUserHistory] = useState([]);

  /* Functions */

  useEffect(() => {
    if (!isUploading) {
      setShowLoadingBar(false); // Hide the loading bar if not uploading
      return;
    }
  
    setShowLoadingBar(true); // Show the loading bar when uploading starts
    let progress = 0;
  
    const updateProgress = () => {
      progress += 5;
      setLoadingPercentage(progress);
  
      if (progress < 100) {
        setTimeout(updateProgress, 100); // Continue incrementing
      } else if (progress === 100) {
        // Once progress reaches 100, proceed based on the phase
        if (phase < 2) {
          // Transition to the second phase after a brief moment to visibly show 100%
          setTimeout(() => {
            setPhase(phase + 1); // Move to the next phase
            setShowLoadingBar(false); // Optionally hide the bar before starting the second phase
            setTimeout(() => {
              setLoadingPercentage(0); // Reset progress for the second phase
              setShowLoadingBar(true); // Show the loading bar for the second phase
            }, 500); // Short delay before starting the second phase
          }, 500); // Time to wait with the bar filled at 100% before resetting
        } else if (phase === 2) {
          // Handle completion after showing 100% filled for a brief moment
          setTimeout(() => {
            setPhase(3); // Indicate completion
            setShowLoadingBar(false); // Hide loading bar as we display "Almost there"
          }, 500);
        }
      }
    };
  
    // Start the progress update loop
    updateProgress();
  
    // Cleanup function to clear any ongoing timeouts if the component unmounts
    return () => {
      setShowLoadingBar(false);
      setLoadingPercentage(0);
    };
  }, [isUploading, phase]);
  
  
  

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
    <BrowserRouter>
    <div className="App">
      {isAuthenticated ? (
        <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <header className="App-header">
            {/* Other content */}
            <nav className="pagelinks">
                {/* Updated navigation links */}
                <Link className="link"to="/">Home</Link>
                <Link className="link"to="/tips-and-tricks">Tips and Tricks</Link>
                <Link className="link"to="/about-us">About the Creators</Link>
                <Link className="link"to="/privacy-policy">Privacy Policy</Link>
                <Link className="link"to="/terms-and-conditions">Terms and Conditions</Link>
              </nav>
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
          <Routes>
          <Route path="/" element={
             <>
          <LeftBar isOpen={sidebarOpen} userHistory={userHistory} />
            <div
              className="exp"
              style={{
                backgroundColor: "#282c34",
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
                      // Dynamic Loading Screen
                      <div className="loading-screen">
                      {showLoadingBar && (
                        <>
                          <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${loadingPercentage}%` }}></div>
                          </div>
                          <div className="progress-text">
                            {phase === 1 && "Resume Co-Pilot is Analyzing - " + loadingPercentage + "%"}
                            {phase === 2 && "Resume Co-Pilot is Reading - " + loadingPercentage + "%"}
                          </div>
                        </>
                      )}
                      {phase === 3 && (
                        <div className="progress-text">Almost there</div>
                      )}
                    </div>
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
            </>
            } />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/tips-and-tricks" element={<TipsAndTricks />} />
            <Route path="/about-us" element={<AboutUs />}/>
          </Routes>
          </main>
        </div>
      ) : (
        <div>Redirecting to login...</div>
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;  