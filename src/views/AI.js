import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import './AI.css';
import Navbar from '../components/navbar';

const AI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const formatMessage = (content) => {
    // Convert ** to <strong> tags
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert newlines to <br> tags
    content = content.replace(/\n/g, '<br>');

    // Convert numbered lists
    content = content.replace(/(\d+\.\s.*?)(?=\n\d+\.|\n\n|$)/gs, '<ol><li>$1</li></ol>');
    content = content.replace(/<\/li>\n<li>/g, '</li><li>');

    return content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8001/chatwithai', { query: input });
      const formattedResponse = formatMessage(response.data);
      setMessages((prev) => [...prev, { type: 'bot', content: formattedResponse }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <Navbar></Navbar>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type}`}
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        ))}
        {isLoading && (
          <div className="loading">
            Loading...
          </div>
        )}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          <Send />
        </button>
      </form>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AI;