
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface InitialSuggestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const InitialSuggestions: React.FC<InitialSuggestionsProps> = ({ questions, onSelectQuestion }) => {
  return (
    <motion.div 
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-xs text-fin-500 dark:text-fin-400 mb-2">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, 3).map((question, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default InitialSuggestions;
