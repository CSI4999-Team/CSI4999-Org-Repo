import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

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

  return (
    <div className="App">
      <body>
        <header className="App-header">
          <div>
            <nav class="App">
              <a href="/" class="logo" onclick="burgerClicked = false;">
                <img
                  src="..\public\favicon.ico"
                  alt="Resume Co-Pilot"
                  class="logo-img"
                />
              </a>
              <div class="nav-links">
                <a href="#about" class="nav-link">
                  About
                </a>
                <a href="#faq" class="nav-link">
                  FAQ
                </a>
              </div>
            </nav>
          </div>
        </header>
        <main className="App-main">
          <h1>Resume Co-Pilot</h1>
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
        </main>
      </body>
    </div>
  );
}

export default App;
