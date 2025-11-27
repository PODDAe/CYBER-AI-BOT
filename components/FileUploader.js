import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const onDrop = acceptedFiles => setFiles(acceptedFiles);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: e => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });
      alert('Upload complete!');
    } catch {
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
          <button onClick={uploadFiles}>Upload</button>
          <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>
        </>
      )}
    </div>
  );
}
