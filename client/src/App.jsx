import React from 'react';
import ChatWindow from './components/ChatWindow';
import FileUploader from './components/FileUploader';
import './styles/cyberpunk.css';

function App() {
  return (
    <div className="app-container">
      <h1>🤖 CYBER AI BOT</h1>
      <ChatWindow />
      <FileUploader />
    </div>
  );
}

export default App;