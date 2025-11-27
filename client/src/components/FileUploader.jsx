import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUploader = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => setFiles(acceptedFiles);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: e => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });
      alert('Upload complete!');
    } catch (err) {
      alert('Upload failed.');
    }
  };

  return (
    <div className="uploader">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag & drop files here or click to select</p>
      </div>
      {files.length > 0 && (
        <>
          <ul>{files.map((file, i) => <li key={i}>{file.name}</li>)}</ul>
          <button onClick={handleUpload}>Upload</button>
          <div className="progress-bar"><div style={{ width: `${uploadProgress}%` }} /></div>
        </>
      )}
    </div>
  );
};

export default FileUploader;