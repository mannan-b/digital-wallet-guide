
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
  messageVariants: any;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ messageVariants }) => {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex justify-start"
    >
      <div className="bg-fin-100 dark:bg-fin-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-sage-500" />
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-fin-400 dark:bg-fin-500 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-fin-400 dark:bg-fin-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 bg-fin-400 dark:bg-fin-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
