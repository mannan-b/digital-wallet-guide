
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import PaySection from '@/components/PaySection';
import TransactionsSection from '@/components/TransactionsSection';
import CalculatorSection from '@/components/CalculatorSection';
import SageBotSection from '@/components/SageBotSection';

const Index = () => {
  const [activeTab, setActiveTab] = useState('pay');

  // Tab transition animation
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <Layout>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="py-6 min-h-[calc(100vh-200px)]"
        >
          {activeTab === 'pay' && <PaySection />}
          {activeTab === 'transactions' && <TransactionsSection />}
          {activeTab === 'calculator' && <CalculatorSection />}
          {activeTab === 'sagebot' && <SageBotSection />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
