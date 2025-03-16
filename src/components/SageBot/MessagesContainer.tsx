
import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Message } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessagesContainerProps {
  messages: Message[];
  isTyping: boolean;
  messageVariants: any;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ 
  messages, 
  isTyping, 
  messageVariants 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            messageVariants={messageVariants} 
          />
        ))}
        {isTyping && (
          <TypingIndicator messageVariants={messageVariants} />
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
