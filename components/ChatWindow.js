import { useState } from 'react';
import axios from 'axios';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error: AI not responding.' }]);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
    </div>
  );
}
