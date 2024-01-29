import React, { useState } from 'react';

function ResumeUploader() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');

    const handleResumeChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle the form submission goes here
        console.log('Resume:', resume);
        console.log('Job Description:', jobDescription);
        // After this, you would typically send the data to the backend
    };

    return (
        <div>
            <h2>Resume Co-Pilot</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Upload Resume:
                        <input type="file" onChange={handleResumeChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Job Description:
                        <textarea value={jobDescription} onChange={handleDescriptionChange} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ResumeUploader;
