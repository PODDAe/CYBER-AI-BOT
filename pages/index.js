import Head from 'next/head';
import ChatWindow from '../components/ChatWindow';
import FileUploader from '../components/FileUploader';
import '../public/cyberpunk.css';

export default function Home() {
  return (
    <div className="app-container">
      <Head>
        <title>Cyber AI Bot</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <h1>🤖 CYBER AI BOT</h1>
      <ChatWindow />
      <FileUploader />
    </div>
  );
}