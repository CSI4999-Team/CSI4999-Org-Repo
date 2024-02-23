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
            const response = await fetch('http://localhost:8000/api/parse_pdf/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
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
