
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Message } from './types';
import ChatHeader from './ChatHeader';
import MobileSidebar from './MobileSidebar';
import MessagesContainer from './MessagesContainer';
import ChatInput from './ChatInput';
import InitialSuggestions from './InitialSuggestions';

interface ChatAreaProps {
  messages: Message[];
  inputValue: string;
  isTyping: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSuggestedQuestion: (question: string) => void;
  suggestedQuestions: string[];
  messageVariants: any;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  inputValue,
  isTyping,
  isSidebarOpen,
  setIsSidebarOpen,
  setInputValue,
  handleSubmit,
  handleSuggestedQuestion,
  suggestedQuestions,
  messageVariants
}) => {
  return (
    <motion.div 
      className="col-span-1 lg:col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50 h-[600px] flex flex-col">
        {/* Header section */}
        <ChatHeader 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        {/* Mobile Sidebar */}
        <MobileSidebar 
          isSidebarOpen={isSidebarOpen}
          questions={suggestedQuestions}
          onSelectQuestion={handleSuggestedQuestion}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        {/* Messages area */}
        <MessagesContainer 
          messages={messages}
          isTyping={isTyping}
          messageVariants={messageVariants}
        />
        
        {/* Input area */}
        <div className="p-4 border-t border-sage-100 dark:border-fin-800">
          <ChatInput 
            inputValue={inputValue}
            isTyping={isTyping}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
          />
          
          {/* Suggested questions (only show when no messages) */}
          {messages.length === 1 && (
            <InitialSuggestions 
              questions={suggestedQuestions}
              onSelectQuestion={handleSuggestedQuestion}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ChatArea;
