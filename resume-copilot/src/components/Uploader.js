import React, { useState } from "react";
import "./Uploader.css";

const Uploader = () => {
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL
  const [fileUploaded, setFileUploaded] = useState(false); // State to track whether file is uploaded or not

  const handleFileChange = (event) => {
    // Handle file upload logic here
    console.log("File changed:", event.target.files);

    const file = event.target.files[0];
    if (file) {
      const imgLink = URL.createObjectURL(file);
      setImageUrl(imgLink); // Update the image URL in state
      setFileUploaded(true); // Set fileUploaded state to true
    }
  };

  return (
    <div className="drop-field">
      <label htmlFor="input-file-field" id="drop-area">
        <input
          type="file"
          id="input-file-field"
          onChange={handleFileChange}
          hidden
          accept="application"
        />
        <div
          id="img-view"
          style={{
            backgroundImage: `url(${imageUrl})`, // Set background image using state
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {fileUploaded ? (
            <span class="fileUploaded">Uploaded file</span> // Display uploaded file content
          ) : (
            <>
              <img src="UploaderIcon.svg" alt="Upload icon" />
              <p>
                Drag and drop or click here
                <br />
                to upload files
              </p>
              <span>Upload any file from desktop</span>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default Uploader;
