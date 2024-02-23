import React, { useState } from 'react';

function UploadForm() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please upload a file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Step 1: Extract resume text from the uploaded PDF file
            const parseResponse = await fetch('http://localhost:8000/api/parse_pdf/', {
                method: 'POST',
                body: formData,
            });
            const parseData = await parseResponse.json();
            const resumeText = parseData.extracted_text;

            // Step 2: Analyze the extracted resume text
            const analyzeResponse = await fetch('http://localhost:8000/api/analyze_resume/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify({ resume_text: resumeText }), // Pass the resume_text in the request body
            });
            const analyzeData = await analyzeResponse.json();
            console.log(analyzeData);
            // Handle the response data
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadForm;
