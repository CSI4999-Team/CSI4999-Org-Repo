import React, { useState } from "react";
import LeftBar from "./components/LeftBar"; // Importing the LeftBar component
import Uploader from "./components/Uploader"; // Importing the Uploader component
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // used to set/open sidebar (starts at false, meaning closed/not open)

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

  return (
    // Overarching div for entire application
    <div className="App">
      {/* Have the sidebar div outside of everything so it can be opened from the side... might change later to underneath navbar */}
      <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* The navbar */}
        <header className="App-header">
          <div>
            <nav className="App">
              <a
                href="/"
                className="logo"
                onClick={() => setSidebarOpen(false)}
              >
                <img
                  src="..\public\favicon.ico"
                  alt="Resume Co-Pilot"
                  className="logo-img"
                />
              </a>
              <div className="nav-links">
                <a href="#about" className="nav-link">
                  About
                </a>
                <a href="#faq" className="nav-link">
                  FAQ
                </a>
              </div>
            </nav>
          </div>
        </header>
        {/* The main class holding the actual chatbox elements */}
        <main className="App-main">
          {/* This is what opens the left bar... just click! */}
          <LeftBar isOpen={sidebarOpen} /> {/* Pass isOpen prop to LeftBar */}
          <div className="toggle-button" onClick={toggleSidebar}>
            Toggle Sidebar
          </div>
          <h1>Resume Co-Pilot</h1>
          {/* Radio button design, here until replaced */}
          <div className="radio">
            <input
              className="radioInput"
              type="radio"
              value="option1"
              name="myRadio"
              id="myRadio1"
            />
            <label className="radioLabel" htmlFor="myRadio1">
              Computer Science
            </label>

            <input
              className="radioInput"
              type="radio"
              value="option2"
              name="myRadio"
              id="myRadio2"
            />
            <label className="radioLabel" htmlFor="myRadio2">
              Computer Engineering
            </label>

            <input
              className="radioInput"
              type="radio"
              value="option3"
              name="myRadio"
              id="myRadio3"
            />
            <label className="radioLabel" htmlFor="myRadio3">
              Electrical Engineering
            </label>
          </div>
          <input
            className="urlInput"
            type="text"
            placeholder="Enter URL here"
          />
          {/* This is for the textbox */}
          {/* <div class="drop-field">
            <label for="input-file-field" id="drop-area">
              <input
                type="file"
                accept=""
                id="input-file-filed"
                onChange={handleFileChange}
              ></input>
            </label>
          </div> */}
          <Uploader/>
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
        </main>
      </div>
    </div>
  );
}

export default App;
