import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Utensils,
  Plane
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock transaction data (this would normally come from your transactions.csv file)
const mockTransactions = [
  {
    id: 't1',
    date: '2023-05-15',
    description: 'Grocery Store',
    amount: -78.42,
    category: 'shopping',
    categoryName: 'Shopping'
  },
  {
    id: 't2',
    date: '2023-05-14',
    description: 'Monthly Salary',
    amount: 3200.00,
    category: 'income',
    categoryName: 'Income'
  },
  {
    id: 't3',
    date: '2023-05-12',
    description: 'Coffee Shop',
    amount: -4.50,
    category: 'food',
    categoryName: 'Food & Drink'
  },
  {
    id: 't4',
    date: '2023-05-10',
    description: 'Electric Bill',
    amount: -94.27,
    category: 'housing',
    categoryName: 'Housing'
  },
  {
    id: 't5',
    date: '2023-05-08',
    description: 'Gas Station',
    amount: -45.80,
    category: 'transport',
    categoryName: 'Transport'
  },
  {
    id: 't6',
    date: '2023-05-06',
    description: 'Restaurant',
    amount: -32.50,
    category: 'food',
    categoryName: 'Food & Drink'
  },
  {
    id: 't7',
    date: '2023-05-03',
    description: 'Flight Tickets',
    amount: -450.00,
    category: 'travel',
    categoryName: 'Travel'
  }
];

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingBag className="h-4 w-4" />,
  income: <ArrowDownLeft className="h-4 w-4" />,
  food: <Utensils className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
  transport: <Car className="h-4 w-4" />,
  travel: <Plane className="h-4 w-4" />,
};

// Category colors mapping
const categoryColors: Record<string, string> = {
  shopping: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  income: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  housing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  transport: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  travel: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
};

const TransactionsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter transactions based on search query and active filter
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || transaction.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Transaction list animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <Card className="border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50">
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <CardTitle className="text-2xl font-display flex items-center gap-2">
            <Calendar className="h-5 w-5 text-sage-500" />
            Transaction History
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-fin-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-7 bg-sage-50 dark:bg-fin-800">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveFilter('all')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="income" 
                  onClick={() => setActiveFilter('income')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Income
                </TabsTrigger>
                <TabsTrigger 
                  value="shopping" 
                  onClick={() => setActiveFilter('shopping')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Shopping
                </TabsTrigger>
                <TabsTrigger 
                  value="food" 
                  onClick={() => setActiveFilter('food')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Food
                </TabsTrigger>
                <TabsTrigger 
                  value="housing" 
                  onClick={() => setActiveFilter('housing')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Housing
                </TabsTrigger>
                <TabsTrigger 
                  value="transport" 
                  onClick={() => setActiveFilter('transport')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Transport
                </TabsTrigger>
                <TabsTrigger 
                  value="travel" 
                  onClick={() => setActiveFilter('travel')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Travel
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeFilter} className="mt-6">
                {/* TRANSACTION CLASSIFICATION ML MODEL INTEGRATION POINT */}
                {/* ------------------------------------------------------ */}
                {const classifyTransactions = async (transactions) => {
    const response = await fetch('/classify', {
        method: 'POST',
        headers: {
            'Content-Type': 'src/components/classify.json',
        },
        body: JSON.stringify(transactions),
    });
    const categories = await response.json();
    // Update transaction data with categories
    const categorizedTransactions = transactions.map((transaction, i) => ({
        ...transaction,
        category: categories[i],
    }));
    // Update UI with categorized transactions
    return categorizedTransactions;
};
}
                
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-fin-500 dark:text-fin-400">No transactions found.</p>
                  </div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredTransactions.map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-fin-800 border border-sage-50 dark:border-fin-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full",
                            transaction.amount > 0 
                              ? "bg-sage-100 text-sage-600 dark:bg-sage-900 dark:text-sage-300" 
                              : "bg-fin-100 text-fin-600 dark:bg-fin-800 dark:text-fin-300"
                          )}>
                            {transaction.amount > 0 
                              ? <ArrowDownLeft className="h-5 w-5" /> 
                              : <ArrowUpRight className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-fin-800 dark:text-fin-200">{transaction.description}</p>
                            <p className="text-xs text-fin-500 dark:text-fin-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "flex items-center gap-1 px-2 py-1",
                              categoryColors[transaction.category]
                            )}
                          >
                            {categoryIcons[transaction.category]}
                            {transaction.categoryName}
                          </Badge>
                          <span className={cn(
                            "font-medium",
                            transaction.amount > 0 ? "text-sage-600 dark:text-sage-400" : "text-fin-600 dark:text-fin-300"
                          )}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsSection;
