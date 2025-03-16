
import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  inputValue: string;
  isTyping: boolean;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  inputValue, 
  isTyping, 
  setInputValue, 
  handleSubmit 
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        id="message-input"
        placeholder="Ask SageBot a financial question..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!inputValue.trim() || isTyping}
        className="bg-sage-500 hover:bg-sage-600 text-white rounded-full h-10 w-10 flex items-center justify-center"
      >
        {isTyping ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
