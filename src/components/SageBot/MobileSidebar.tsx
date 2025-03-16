
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuggestedQuestions from './SuggestedQuestions';

interface MobileSidebarProps {
  isSidebarOpen: boolean;
  questions: string[];
  onSelectQuestion: (question: string) => void;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isSidebarOpen, 
  questions, 
  onSelectQuestion,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden border-b border-sage-100 dark:border-fin-800"
        >
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Suggested Questions</h3>
            <SuggestedQuestions 
              questions={questions} 
              onSelectQuestion={onSelectQuestion} 
              isMobile={true} 
              onMobileClose={onClose}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
