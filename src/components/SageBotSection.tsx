
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  ChevronRight, 
  Bot, 
  Sparkles, 
  PanelRight,
  ChevronDown,
  X 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Sample suggested questions
const suggestedQuestions = [
  'How can I save for retirement?',
  'What's the difference between stocks and bonds?',
  'How can I improve my credit score?',
  'Should I invest in cryptocurrency?',
  'How do I create a budget?',
  'What is an emergency fund?'
];

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
    
    // INTEGRATE YOUR LLM HERE
    // -----------------------
    /*
    This is where you would integrate with your LLM backend.
    The user's message is in the userMessage.content variable.
    
    Example:
    
    async function getBotResponse(userMessage: string) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to get response from LLM');
        }
        
        const data = await response.json();
        return data.response;
      } catch (error) {
        console.error('Error getting LLM response:', error);
        return "I'm sorry, I'm having trouble processing your request right now.";
      }
    }
    
    // Actually make the API call and get the response
    const llmResponse = await getBotResponse(userMessage.content);
    */
    
    // For now, simulate a response for the demo
    simulateBotResponse(userMessage.content);
  };
  
  // Simulate bot response (replace with actual LLM integration)
  const simulateBotResponse = (userMessage: string) => {
    setTimeout(() => {
      let botResponse = "";
      
      // Simple keyword matching for demo purposes
      const lowerCaseMsg = userMessage.toLowerCase();
      
      if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi')) {
        botResponse = "Hello! How can I help with your financial questions today?";
      } else if (lowerCaseMsg.includes('budget')) {
        botResponse = "Creating a budget is an excellent financial practice! Start by tracking your income and expenses for a month, then categorize your spending to identify areas where you can save. The 50/30/20 rule is a good starting point: 50% for needs, 30% for wants, and 20% for savings and debt repayment.";
      } else if (lowerCaseMsg.includes('invest')) {
        botResponse = "Investing is a great way to grow your wealth over time. Consider starting with a diversified portfolio through index funds or ETFs. Make sure you've paid off high-interest debt and have an emergency fund before investing significantly.";
      } else if (lowerCaseMsg.includes('retire') || lowerCaseMsg.includes('retirement')) {
        botResponse = "For retirement planning, start by maximizing contributions to tax-advantaged accounts like 401(k)s and IRAs. Aim to save at least 15% of your income for retirement. The earlier you start, the more time your investments have to grow through compound interest.";
      } else if (lowerCaseMsg.includes('credit score')) {
        botResponse = "To improve your credit score: pay bills on time, reduce debt, don't close old credit accounts, limit new credit inquiries, and regularly check your credit report for errors. Payment history (35%) and credit utilization (30%) have the biggest impact on your FICO score.";
      } else if (lowerCaseMsg.includes('emergency fund')) {
        botResponse = "An emergency fund is money set aside for unexpected expenses like medical emergencies or job loss. Aim to save 3-6 months of essential expenses in a readily accessible account like a high-yield savings account.";
      } else if (lowerCaseMsg.includes('crypto') || lowerCaseMsg.includes('cryptocurrency')) {
        botResponse = "Cryptocurrency is a highly volatile investment that should only represent a small portion of your portfolio, if any. Only invest money you can afford to lose, and make sure you understand the technology and risks involved before investing.";
      } else if (lowerCaseMsg.includes('stocks') && lowerCaseMsg.includes('bonds')) {
        botResponse = "Stocks represent ownership in a company and tend to have higher potential returns but with more volatility. Bonds are loans to companies or governments that typically provide more stable but lower returns. A balanced portfolio often includes both to manage risk.";
      } else {
        botResponse = "That's an interesting financial question. To provide you with the most accurate advice, I'd need to understand more about your specific financial situation and goals. Would you like to provide more details?";
      }
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500); // Simulate thinking time
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
        <motion.div 
          className="hidden lg:block lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-[600px] border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display">Help Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="personal-finance">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Personal Finance
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-2">
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("How do I create a budget?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Budgeting
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("What is an emergency fund?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Emergency Fund
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("How can I improve my credit score?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Credit Score
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="investing">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Investing
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-2">
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("What's the difference between stocks and bonds?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Stocks vs Bonds
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("Should I invest in cryptocurrency?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Cryptocurrency
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("How can I save for retirement?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Retirement
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tax">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Tax Planning
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-2">
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("How can I reduce my tax liability?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Tax Reduction
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => handleSuggestedQuestion("What tax deductions am I eligible for?")}>
                        <ChevronRight className="h-3 w-3 mr-1" /> Deductions
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Main chat area */}
        <motion.div 
          className="col-span-1 lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50 h-[600px] flex flex-col">
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
            
            {/* Mobile Sidebar */}
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
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start text-xs"
                          onClick={() => {
                            handleSuggestedQuestion(question);
                            setIsSidebarOpen(false);
                          }}
                        >
                          <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" /> 
                          <span className="truncate">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
              <AnimatePresence initial={false}>
                {messages.map((message) => (
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
                ))}
                {isTyping && (
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
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-sage-100 dark:border-fin-800">
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
              
              {/* Suggested questions (only show when no messages) */}
              {messages.length === 1 && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-fin-500 dark:text-fin-400 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SageBotSection;
