
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onSelectQuestion, 
  isMobile = false,
  onMobileClose
}) => {
  const handleClick = (question: string) => {
    onSelectQuestion(question);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-xs"
          onClick={() => handleClick(question)}
        >
          <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" /> 
          <span className="truncate">{question}</span>
        </Button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
