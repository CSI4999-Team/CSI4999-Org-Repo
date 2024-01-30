import React, { useState } from 'react';
import './App.css';

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
    alert('Resume and job description submitted!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Co-Pilot</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <textarea
            placeholder="Paste job description here"
            value={jobDescription}
            onChange={handleDescriptionChange}
          />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
