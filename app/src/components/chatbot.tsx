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
    question: 'Are there any mileage limits?',
    answer: 'Our standard rental comes with an unlimited mileage.',
  },
  {
    question: 'What documents do I need to rent a car?',
    answer: 'You will need a valid driver\'s license and a credit card in the driver\'s namea',
  },
  {
    question: 'Can I pick which location I would like to rent from?',
    answer: 'Yes, you can pick your desired location to rent a vehicle.',
  },
  {
    question: 'What happens if I return the car late?',
    answer: 'We understand that sometimes there might be delays. Unfortunstely, there might be additional charges.',
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
    question: 'Can I rent a car with a child seat or GPS?',
    answer: 'Yes, we have a range of accessories available for rental, including child seats, GPS devices, and ski racks. These can be added to your booking during the reservation process in the additional notes section.',
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    handleSend();
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // You would implement some basic logic to determine the bot's response
    // Here, for simplicity, we're just checking if the user says 'hi' or similar.
    const userMessage: Message = { user: 'user', text: inputValue };
    let botResponse: string | ReactNode = 'Let me get that information for you...';
    
    if (/hi|hello|hey|Hi|Hello/i.test(inputValue.toLowerCase())) {
      botResponse = 'Hello! How can I assist you with your car rental today? 😊';
    }
    const botMessage: Message = { user: 'bot', text: botResponse };

    setMessages([...messages, userMessage, botMessage]);
    setInputValue('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages(initialMessages); // Reset the messages to the initial state
  };

  const handleFAQClick = (faq: { question: string; answer: string }) => {
    // Include both the question and answer in the bot's message
    const botMessage: Message = {
      user: 'bot',
      text: (
        <>
          <strong>Question:</strong> {faq.question}
          <br />
          <strong>Answer:</strong> {faq.answer}
        </>
      ),
    };
    setMessages([...messages, botMessage]);
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-1 rounded w-full"
                placeholder="Ask me something..."
                autoFocus
              />
              <button type="submit" className="bg-blue-400 text-white p-2 rounded w-full">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
  
  {!isOpen && (
      <button
        className="fixed bottom-5 right-5 z-50 p-4 bg-blue-400 text-white rounded-full shadow-lg focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        Chat
      </button>
    )}
  </>
);
}
export default Chatbot;
