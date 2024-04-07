'use client';
import React, { useState, ReactNode } from 'react';

type Message = {
  user: 'bot' | 'user';
  text: string | ReactNode;
};

const faqs = [
  {
    question: 'How do I rent a car?',
    answer: 'You would need to create an account to rent a vehicle. Then, you can click the rent button and select your desired car.',
  },
  {
    question: 'Can I pick which location I would like to rent from?',
    answer: 'Yes, you can pick your desired location to rent a vehicle.',
  },
  {
    question: 'What happens if I return the car late?',
    answer: 'We understand that sometimes there might be delays. We offer a 30-minute grace period for returns; thereafter, additional charges may apply.',
  },
  {
    question: 'What is the fuel policy?',
    answer: 'Our cars come with a full tank of fuel. You can return the vehicle with a full tank or pay for the fuel used at the end of your rental period.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We offer a full refund for cancellations made at least 24 hours before the rental start time. Cancellations made after this period may be subject to a fee.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards including Visa, MasterCard, and American Express. Payments are securely processed at the time of booking.',
  },

];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessages: Message[] = [
    { user: 'bot', text: "Hello there! 👋 I'm here to help you with all things car rental. Feel free to ask me any questions or browse through the FAQs below to find quick answers. Let's get you on the road! 🚗" },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newUserMessage: Message = { user: 'user', text: inputValue };
    const newBotMessage: Message = { user: 'bot', text: 'Let me get that information for you...' };
    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputValue('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages(initialMessages); // Reset the messages to the initial state
  };

  const handleFAQClick = (faq: { question: string; answer: string }) => {
    const newBotMessage: Message = {
      user: 'bot',
      text: (
        <>
          <strong>Answer:</strong> {faq.answer}
        </>
      ),
    };
    setMessages([...messages, newBotMessage]);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center p-2 bg-blue-400 text-white text-lg rounded-t-lg">
            Chat with us!
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="p-4 overflow-auto h-64">
            {messages.map((message, index) => (
              <div key={index} className={`p-2 ${message.user === 'bot' ? 'text-left' : 'text-right'}`}>
                {message.text}
              </div>
            ))}
            <div className="mt-4">
              <p className="font-bold">Frequently Asked Questions:</p>
              {faqs.map((faq, index) => (
                <div key={index} className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleFAQClick(faq)}>
                  {faq.question}
                </div>
              ))}
            </div>
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
            <button onClick={handleSend} className="bg-blue-400 text-white p-2 rounded w-full">
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          className="fixed bottom-5 right-5 z-50 p-4 bg-blue-400 text-white rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}
    </>
  );
};

export default Chatbot;
