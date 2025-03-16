
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  messageVariants: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, messageVariants }) => {
  return (
    <motion.div
      key={message.id}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "flex",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.sender === 'user' 
            ? "bg-sage-500 text-white rounded-tr-none" 
            : "bg-fin-100 dark:bg-fin-800 text-fin-800 dark:text-fin-100 rounded-tl-none"
        )}
      >
        <div className="flex items-start gap-2">
          {message.sender === 'bot' && (
            <Bot className="h-5 w-5 text-sage-500 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className="whitespace-pre-line">{message.content}</p>
            <p className="text-xs opacity-70 mt-1 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {message.sender === 'user' && (
            <div className="h-5 w-5 mt-0.5 flex-shrink-0" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
