
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Building, 
  TrendingUp, 
  AlertCircle, 
  Filter,
  Key,
  ArrowRight,
  PiggyBank
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock investment options
const investmentOptions = [
  {
    id: 'sip1',
    type: 'sip',
    name: 'SBI Bluechip Fund',
    description: 'Large Cap Mutual Fund with stable returns',
    returns: '12.5% (3Y)',
    risk: 'Medium',
    minInvestment: '₹500/month',
    recommended: true
  },
  {
    id: 'sip2',
    type: 'sip',
    name: 'Axis Small Cap Fund',
    description: 'Small Cap Fund for high growth potential',
    returns: '18.7% (3Y)',
    risk: 'High',
    minInvestment: '₹500/month',
    recommended: false
  },
  {
    id: 'fd1',
    type: 'fd',
    name: 'HDFC Bank FD',
    description: 'Fixed Deposit with guaranteed returns',
    returns: '7.0% (5Y)',
    risk: 'Low',
    minInvestment: '₹10,000',
    recommended: true
  },
  {
    id: 'rd1',
    type: 'rd',
    name: 'ICICI Bank RD',
    description: 'Recurring Deposit with monthly contributions',
    returns: '6.5% (3Y)',
    risk: 'Low',
    minInvestment: '₹1,000/month',
    recommended: false
  },
  {
    id: 'crypto1',
    type: 'crypto',
    name: 'Bitcoin (BTC)',
    description: 'Leading cryptocurrency with highest market cap',
    returns: 'Variable',
    risk: 'Very High',
    minInvestment: '₹100',
    recommended: false
  },
  {
    id: 'real1',
    type: 'real',
    name: 'Residential Property',
    description: 'Investment in residential real estate',
    returns: '8-10% (Annual)',
    risk: 'Medium-High',
    minInvestment: 'Variable',
    recommended: true
  }
];

interface InvestmentOptionCardProps {
  option: typeof investmentOptions[0];
}

const InvestmentOptionCard: React.FC<InvestmentOptionCardProps> = ({ option }) => {
  // Map investment types to icons
  const getIcon = (type: string) => {
    switch(type) {
      case 'sip':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'fd':
      case 'rd':
        return <PiggyBank className="h-5 w-5 text-green-500" />;
      case 'crypto':
        return <Coins className="h-5 w-5 text-purple-500" />;
      case 'real':
        return <Building className="h-5 w-5 text-orange-500" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
    }
  };

  // Map risk levels to colors
  const getRiskBadgeColor = (risk: string) => {
    switch(risk) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Very High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className={cn(
        "border border-sage-100 dark:border-fin-800 h-full transition-all duration-300 hover:shadow-md",
        option.recommended ? "shadow-md bg-white/90 dark:bg-fin-900/70" : "bg-white/70 dark:bg-fin-900/50"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              {getIcon(option.type)}
              <div>
                <CardTitle className="text-lg font-medium">
                  {option.name}
                </CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </div>
            {option.recommended && (
              <Badge variant="default" className="bg-sage-500 hover:bg-sage-600">Recommended</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-fin-500 dark:text-fin-400">Expected Returns</p>
              <p className="font-medium text-fin-800 dark:text-fin-200">{option.returns}</p>
            </div>
            <div>
              <p className="text-sm text-fin-500 dark:text-fin-400">Risk Level</p>
              <Badge variant="secondary" className={cn("mt-1", getRiskBadgeColor(option.risk))}>
                {option.risk}
              </Badge>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-fin-500 dark:text-fin-400">Minimum Investment</p>
              <p className="font-medium text-fin-800 dark:text-fin-200">{option.minInvestment}</p>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InvestSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter investments based on active filter
  const filteredInvestments = activeFilter === 'all' 
    ? investmentOptions 
    : investmentOptions.filter(option => option.type === activeFilter);

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <Card className="border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50">
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <CardTitle className="text-2xl font-display flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-sage-500" />
            Investment Recommendations
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-sage-50 border-sage-200 flex gap-1 items-center">
              <AlertCircle className="h-3 w-3" /> AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* INVESTMENT RECOMMENDATION ML MODEL INTEGRATION POINT */}
          {/* ---------------------------------------------------- */}
          {/* 
          This is where you would integrate your ML model for investment recommendations.
          
          Example pseudo-code:
          
          const getInvestmentRecommendations = async (userProfile) => {
            // Load the ML model 
            const model = await tf.loadLayersModel('path/to/your/investment/model.json');
            
            // Prepare user profile data for the model
            // This might include: age, income, risk tolerance, investment goals, etc.
            const processedUserData = preprocessUserProfile(userProfile);
            
            // Make predictions with the model
            const predictions = model.predict(tf.tensor([processedUserData]));
            
            // Process the model output to get recommended investment types
            const recommendedInvestments = processRecommendations(predictions);
            
            // Return recommendations sorted by relevance
            return recommendedInvestments;
          };
          
          // Get personalized investment recommendations based on user profile
          const userRecommendations = await getInvestmentRecommendations(userProfile);
          */}
          
          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 bg-sage-50 dark:bg-fin-800">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveFilter('all')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="sip" 
                  onClick={() => setActiveFilter('sip')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Mutual Funds
                </TabsTrigger>
                <TabsTrigger 
                  value="fd" 
                  onClick={() => setActiveFilter('fd')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Fixed Deposits
                </TabsTrigger>
                <TabsTrigger 
                  value="rd" 
                  onClick={() => setActiveFilter('rd')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Recurring Deposits
                </TabsTrigger>
                <TabsTrigger 
                  value="crypto" 
                  onClick={() => setActiveFilter('crypto')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Cryptocurrency
                </TabsTrigger>
                <TabsTrigger 
                  value="real" 
                  onClick={() => setActiveFilter('real')}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Real Estate
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeFilter} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredInvestments.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-fin-500 dark:text-fin-400">No investment options found.</p>
                    </div>
                  ) : (
                    filteredInvestments.map((option) => (
                      <InvestmentOptionCard key={option.id} option={option} />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestSection;
