
import React from 'react';
import { X, PanelRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <CardHeader className="pb-2 border-b border-sage-100 dark:border-fin-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-sage-100">
            <AvatarImage src="/placeholder.svg" alt="SageBot" />
            <AvatarFallback className="bg-sage-200 text-sage-700">SB</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-display flex items-center gap-1">
              SageBot <Badge variant="outline" className="ml-1 bg-sage-100 text-sage-700 text-xs">AI</Badge>
            </CardTitle>
            <CardDescription className="text-xs">Your personal financial advisor</CardDescription>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
        </Button>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
