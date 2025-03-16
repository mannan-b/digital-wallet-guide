
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HelpTopicsSidebar from './SageBot/HelpTopicsSidebar';
import ChatArea from './SageBot/ChatArea';
import { Message } from './SageBot/types';
import { suggestedQuestions } from './SageBot/data';
import { simulateBotResponse } from './SageBot/botUtils';

const SageBotSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm SageBot, your personal financial advisor. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // For now, simulate a response for the demo
    simulateBotResponse(
      userMessage.content, 
      (botMessage) => setMessages(prev => [...prev, botMessage]),
      setIsTyping
    );
  };
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    
    // Focus on input after setting the value
    const inputElement = document.getElementById('message-input');
    if (inputElement) {
      (inputElement as HTMLInputElement).focus();
    }
  };
  
  // Message animations
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar on larger screens */}
        <HelpTopicsSidebar onSelectQuestion={handleSuggestedQuestion} />
        
        {/* Main chat area */}
        <ChatArea 
          messages={messages}
          inputValue={inputValue}
          isTyping={isTyping}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          handleSuggestedQuestion={handleSuggestedQuestion}
          suggestedQuestions={suggestedQuestions}
          messageVariants={messageVariants}
        />
      </div>
    </div>
  );
};

export default SageBotSection;
