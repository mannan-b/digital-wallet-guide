
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface HelpTopicsSidebarProps {
  onSelectQuestion: (question: string) => void;
}

const HelpTopicsSidebar: React.FC<HelpTopicsSidebarProps> = ({ onSelectQuestion }) => {
  return (
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
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("How do I create a budget?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Budgeting
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("What is an emergency fund?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Emergency Fund
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("How can I improve my credit score?")}>
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
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("What's the difference between stocks and bonds?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Stocks vs Bonds
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("Should I invest in cryptocurrency?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Cryptocurrency
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("How can I save for retirement?")}>
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
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("How can I reduce my tax liability?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Tax Reduction
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full text-xs" onClick={() => onSelectQuestion("What tax deductions am I eligible for?")}>
                    <ChevronRight className="h-3 w-3 mr-1" /> Deductions
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HelpTopicsSidebar;
