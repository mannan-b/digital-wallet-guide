
import React from 'react';
import Logo from './Logo';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-sage-50/70 to-white dark:from-fin-900 dark:to-fin-950">
      <header className="border-b border-sage-100 dark:border-fin-800 py-4 bg-white/50 dark:bg-fin-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? (
                  <Sun className="h-5 w-5 text-sage-600" />
                ) : (
                  <Moon className="h-5 w-5 text-sage-400" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t border-sage-100 dark:border-fin-800 mt-auto bg-white/50 dark:bg-fin-900/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-fin-500 dark:text-fin-400">
          <p>© {new Date().getFullYear()} FinSage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
