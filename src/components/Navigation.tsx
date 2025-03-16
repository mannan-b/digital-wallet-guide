
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Banknote, 
  History, 
  Calculator, 
  MessageSquare 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'pay', label: 'Pay', icon: Banknote },
    { id: 'transactions', label: 'Your Transactions', icon: History },
    { id: 'calculator', label: 'Financial Calculator', icon: Calculator },
    { id: 'sagebot', label: 'SageBot', icon: MessageSquare },
  ];

  return (
    <nav className="py-4 mb-8">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between gap-4 overflow-x-auto px-2 pb-2 sm:px-0 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300",
                  "hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500/50",
                  isActive ? "text-sage-700" : "text-fin-700/80"
                )}
              >
                <tab.icon size={18} className={cn(
                  isActive ? "text-sage-600" : "text-fin-500/70"
                )} />
                <span className="font-medium whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sage-100 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
