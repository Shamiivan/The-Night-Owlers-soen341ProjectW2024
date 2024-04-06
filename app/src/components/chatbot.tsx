'use client';
import React, { useState } from 'react';

const faqs = [
  { question: 'How do I rent a car?', answer: 'You can rent a car by visiting our rental options page.' },
  { question: 'What are your opening hours?', answer: 'We are open from 8 am to 10 pm every day.' },
  // Add more FAQs here...
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ user: 'bot', text: "Hi, I'm your friendly car rental assistant. How can I help you today?" }]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newUserMessage = { user: 'user', text: inputValue };
    const newBotMessage = { user: 'bot', text: 'Let me get that information for you...' };
    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputValue('');
  };

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center p-2 bg-blue-500 text-white text-lg rounded-t-lg">
            Chat with us!
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
          <div className="p-4 overflow-auto h-64">
            {/* Display messages */}
            {messages.map((message, index) => (
              <div key={index} className={`p-2 ${message.user === 'bot' ? 'text-left' : 'text-right'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="p-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-1 rounded w-full"
              placeholder="Ask me something..."
            />
          </div>
          <div className="p-2">
            <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded w-full">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Button to open chat */}
      {!isOpen && (
        <button 
          className="fixed bottom-5 right-5 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}
    </>
  );
};

export default Chatbot;
