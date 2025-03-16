
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Percent, 
  DollarSign, 
  Clock, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CalculatorIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CalculatorSection: React.FC = () => {
  // Simple Interest Calculator
  const [simpleInterestValues, setSimpleInterestValues] = useState({
    principal: '',
    rate: '',
    time: '',
  });
  const [simpleInterestResult, setSimpleInterestResult] = useState<number | null>(null);

  // Compound Interest Calculator
  const [compoundInterestValues, setCompoundInterestValues] = useState({
    principal: '',
    rate: '',
    time: '',
    compoundFrequency: '12', // Default to monthly
  });
  const [compoundInterestResult, setCompoundInterestResult] = useState<number | null>(null);

  // GST Calculator
  const [gstValues, setGstValues] = useState({
    amount: '',
    rate: '18', // Default GST rate
  });
  const [gstResult, setGstResult] = useState<{
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  // EMI Calculator
  const [emiValues, setEmiValues] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
  });
  const [emiResult, setEmiResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  // Calculate Simple Interest
  const calculateSimpleInterest = () => {
    const principal = parseFloat(simpleInterestValues.principal);
    const rate = parseFloat(simpleInterestValues.rate);
    const time = parseFloat(simpleInterestValues.time);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      toast.error('Please enter valid numbers');
      return;
    }

    const interest = (principal * rate * time) / 100;
    setSimpleInterestResult(interest);
  };

  // Calculate Compound Interest
  const calculateCompoundInterest = () => {
    const principal = parseFloat(compoundInterestValues.principal);
    const rate = parseFloat(compoundInterestValues.rate);
    const time = parseFloat(compoundInterestValues.time);
    const compoundFrequency = parseInt(compoundInterestValues.compoundFrequency);

    if (
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(time) ||
      isNaN(compoundFrequency)
    ) {
      toast.error('Please enter valid numbers');
      return;
    }

    const amount = principal * Math.pow(1 + rate / 100 / compoundFrequency, compoundFrequency * time);
    const interest = amount - principal;
    setCompoundInterestResult(interest);
  };

  // Calculate GST
  const calculateGST = () => {
    const amount = parseFloat(gstValues.amount);
    const rate = parseFloat(gstValues.rate);

    if (isNaN(amount) || isNaN(rate)) {
      toast.error('Please enter valid numbers');
      return;
    }

    const gstAmount = (amount * rate) / 100;
    const totalAmount = amount + gstAmount;

    setGstResult({
      gstAmount,
      totalAmount,
    });
  };

  // Calculate EMI
  const calculateEMI = () => {
    const loanAmount = parseFloat(emiValues.loanAmount);
    const interestRate = parseFloat(emiValues.interestRate);
    const tenure = parseFloat(emiValues.tenure);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(tenure)) {
      toast.error('Please enter valid numbers');
      return;
    }

    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    // Total number of months
    const totalMonths = tenure * 12;
    
    // EMI calculation formula
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    setEmiResult({
      monthlyPayment: emi,
      totalPayment,
      totalInterest,
    });
  };

  // Reset form values
  const resetCalculator = (calculatorType: string) => {
    switch (calculatorType) {
      case 'simple-interest':
        setSimpleInterestValues({ principal: '', rate: '', time: '' });
        setSimpleInterestResult(null);
        break;
      case 'compound-interest':
        setCompoundInterestValues({ principal: '', rate: '', time: '', compoundFrequency: '12' });
        setCompoundInterestResult(null);
        break;
      case 'gst':
        setGstValues({ amount: '', rate: '18' });
        setGstResult(null);
        break;
      case 'emi':
        setEmiValues({ loanAmount: '', interestRate: '', tenure: '' });
        setEmiResult(null);
        break;
    }
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border border-sage-100 dark:border-fin-800 shadow-md backdrop-blur-sm bg-white/80 dark:bg-fin-900/50">
          <CardHeader>
            <CardTitle className="text-2xl font-display flex items-center gap-2">
              <CalculatorIcon className="h-5 w-5 text-sage-500" />
              Financial Calculator
            </CardTitle>
            <CardDescription>
              Calculate different financial metrics with ease
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="simple-interest" className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-sage-50 dark:bg-fin-800 mb-6">
                <TabsTrigger 
                  value="simple-interest"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Simple Interest
                </TabsTrigger>
                <TabsTrigger 
                  value="compound-interest"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  Compound Interest
                </TabsTrigger>
                <TabsTrigger 
                  value="gst"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  GST
                </TabsTrigger>
                <TabsTrigger 
                  value="emi"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-fin-700"
                >
                  EMI
                </TabsTrigger>
              </TabsList>
              
              {/* Simple Interest Calculator */}
              <TabsContent value="simple-interest" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="si-principal">Principal Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="si-principal"
                          type="number"
                          placeholder="10000"
                          className="pl-10"
                          value={simpleInterestValues.principal}
                          onChange={(e) =>
                            setSimpleInterestValues({
                              ...simpleInterestValues,
                              principal: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="si-rate">Interest Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="si-rate"
                          type="number"
                          placeholder="5"
                          className="pl-10"
                          value={simpleInterestValues.rate}
                          onChange={(e) =>
                            setSimpleInterestValues({
                              ...simpleInterestValues,
                              rate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="si-time">Time Period (years)</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="si-time"
                          type="number"
                          placeholder="3"
                          className="pl-10"
                          value={simpleInterestValues.time}
                          onChange={(e) =>
                            setSimpleInterestValues({
                              ...simpleInterestValues,
                              time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={calculateSimpleInterest}
                        className="flex-1 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => resetCalculator('simple-interest')}
                        className="px-3"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-sage-50 dark:bg-fin-800 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-4 text-fin-700 dark:text-fin-300">Result</h3>
                    {simpleInterestResult !== null ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Principal Amount:</span>
                          <span className="font-medium">${parseFloat(simpleInterestValues.principal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Simple Interest:</span>
                          <span className="font-medium text-sage-600 dark:text-sage-400">${simpleInterestResult.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-sage-200 dark:border-fin-700 pt-3">
                          <span className="text-fin-600 dark:text-fin-400">Total Amount:</span>
                          <span className="font-semibold">${(parseFloat(simpleInterestValues.principal) + simpleInterestResult).toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-fin-500 dark:text-fin-400 text-center">Fill in the values and click Calculate</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Compound Interest Calculator */}
              <TabsContent value="compound-interest" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ci-principal">Principal Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="ci-principal"
                          type="number"
                          placeholder="10000"
                          className="pl-10"
                          value={compoundInterestValues.principal}
                          onChange={(e) =>
                            setCompoundInterestValues({
                              ...compoundInterestValues,
                              principal: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ci-rate">Interest Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="ci-rate"
                          type="number"
                          placeholder="8"
                          className="pl-10"
                          value={compoundInterestValues.rate}
                          onChange={(e) =>
                            setCompoundInterestValues({
                              ...compoundInterestValues,
                              rate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ci-time">Time Period (years)</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="ci-time"
                          type="number"
                          placeholder="5"
                          className="pl-10"
                          value={compoundInterestValues.time}
                          onChange={(e) =>
                            setCompoundInterestValues({
                              ...compoundInterestValues,
                              time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ci-compound-frequency">Compound Frequency</Label>
                      <select
                        id="ci-compound-frequency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={compoundInterestValues.compoundFrequency}
                        onChange={(e) =>
                          setCompoundInterestValues({
                            ...compoundInterestValues,
                            compoundFrequency: e.target.value,
                          })
                        }
                      >
                        <option value="1">Annually</option>
                        <option value="2">Semi-Annually</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                        <option value="365">Daily</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={calculateCompoundInterest}
                        className="flex-1 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => resetCalculator('compound-interest')}
                        className="px-3"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-sage-50 dark:bg-fin-800 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-4 text-fin-700 dark:text-fin-300">Result</h3>
                    {compoundInterestResult !== null ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Principal Amount:</span>
                          <span className="font-medium">${parseFloat(compoundInterestValues.principal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Compound Interest:</span>
                          <span className="font-medium text-sage-600 dark:text-sage-400">${compoundInterestResult.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-sage-200 dark:border-fin-700 pt-3">
                          <span className="text-fin-600 dark:text-fin-400">Total Amount:</span>
                          <span className="font-semibold">${(parseFloat(compoundInterestValues.principal) + compoundInterestResult).toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-fin-500 dark:text-fin-400 text-center">Fill in the values and click Calculate</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* GST Calculator */}
              <TabsContent value="gst" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gst-amount">Amount (excluding GST)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="gst-amount"
                          type="number"
                          placeholder="1000"
                          className="pl-10"
                          value={gstValues.amount}
                          onChange={(e) =>
                            setGstValues({
                              ...gstValues,
                              amount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst-rate">GST Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="gst-rate"
                          type="number"
                          placeholder="18"
                          className="pl-10"
                          value={gstValues.rate}
                          onChange={(e) =>
                            setGstValues({
                              ...gstValues,
                              rate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={calculateGST}
                        className="flex-1 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => resetCalculator('gst')}
                        className="px-3"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-sage-50 dark:bg-fin-800 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-4 text-fin-700 dark:text-fin-300">Result</h3>
                    {gstResult !== null ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Original Amount:</span>
                          <span className="font-medium">${parseFloat(gstValues.amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">GST Amount ({gstValues.rate}%):</span>
                          <span className="font-medium text-sage-600 dark:text-sage-400">${gstResult.gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-sage-200 dark:border-fin-700 pt-3">
                          <span className="text-fin-600 dark:text-fin-400">Total Amount (incl. GST):</span>
                          <span className="font-semibold">${gstResult.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-fin-500 dark:text-fin-400 text-center">Fill in the values and click Calculate</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* EMI Calculator */}
              <TabsContent value="emi" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emi-loan-amount">Loan Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="emi-loan-amount"
                          type="number"
                          placeholder="200000"
                          className="pl-10"
                          value={emiValues.loanAmount}
                          onChange={(e) =>
                            setEmiValues({
                              ...emiValues,
                              loanAmount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emi-interest-rate">Interest Rate (% per annum)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="emi-interest-rate"
                          type="number"
                          placeholder="8"
                          className="pl-10"
                          value={emiValues.interestRate}
                          onChange={(e) =>
                            setEmiValues({
                              ...emiValues,
                              interestRate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emi-tenure">Loan Tenure (years)</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                        <Input
                          id="emi-tenure"
                          type="number"
                          placeholder="20"
                          className="pl-10"
                          value={emiValues.tenure}
                          onChange={(e) =>
                            setEmiValues({
                              ...emiValues,
                              tenure: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={calculateEMI}
                        className="flex-1 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => resetCalculator('emi')}
                        className="px-3"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-sage-50 dark:bg-fin-800 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-4 text-fin-700 dark:text-fin-300">Result</h3>
                    {emiResult !== null ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Loan Amount:</span>
                          <span className="font-medium">${parseFloat(emiValues.loanAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Monthly EMI:</span>
                          <span className="font-medium text-sage-600 dark:text-sage-400">${emiResult.monthlyPayment.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-fin-600 dark:text-fin-400">Total Interest:</span>
                          <span className="font-medium">${emiResult.totalInterest.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-sage-200 dark:border-fin-700 pt-3">
                          <span className="text-fin-600 dark:text-fin-400">Total Payment:</span>
                          <span className="font-semibold">${emiResult.totalPayment.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-fin-500 dark:text-fin-400 text-center">Fill in the values and click Calculate</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalculatorSection;
