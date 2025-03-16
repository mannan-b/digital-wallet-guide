
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Building, 
  DollarSign, 
  Check, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const PaySection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bank, setBank] = useState('');

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod || !bank) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate transaction processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      // PLAID API INTEGRATION POINT
      // ---------------------------- 
      /* 
      This is where you would integrate with Plaid API
      1. Create a Plaid Link token
      2. Initialize Plaid Link
      3. Exchange public token for access token
      4. Make the actual transaction
      
      Example:
      const makeTransaction = async () => {
        // Your Plaid API key would be used here
        const PLAID_API_KEY = "YOUR_PLAID_API_KEY";
        
        // Create a Plaid Link token
        const response = await fetch('/api/create-link-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_name: 'FinSage',
            products: ['auth', 'transactions'],
            language: 'en',
          }),
        });
        
        const data = await response.json();
        const linkToken = data.link_token;
        
        // Initialize Plaid Link
        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            // Exchange public token for access token
            const exchangeResponse = await fetch('/api/exchange-public-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                public_token: publicToken,
              }),
            });
            
            const exchangeData = await exchangeResponse.json();
            const accessToken = exchangeData.access_token;
            
            // Make the transaction
            const transactionResponse = await fetch('/api/create-transaction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_token: accessToken,
                amount: amount,
                account_id: metadata.account_id,
              }),
            });
            
            // Handle response and update transaction record
            // After successful transaction, append to transactions.csv
          },
          onExit: (err, metadata) => {
            // Handle exit
          },
        });
        
        handler.open();
      };
      */
      
      // For now, we'll just simulate success for the demo
      setIsSuccess(true);
      toast.success('Transaction completed successfully');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setAmount('');
        setPaymentMethod('');
        setBank('');
      }, 3000);
    }, 2000);
  };

  // Card fade in animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };
  
  // Success screen animation
  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div 
      className="container max-w-xl mx-auto px-4"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {!isSuccess ? (
        <Card className="border border-sage-100 dark:border-fin-800 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/80 dark:bg-fin-900/50">
          <CardHeader>
            <CardTitle className="text-2xl font-display flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-sage-500" />
              Make a Payment
            </CardTitle>
            <CardDescription>
              Secure and fast payments powered by Plaid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransaction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-fin-800 dark:text-fin-200">
                  Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-fin-500 dark:text-fin-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10 font-medium h-12"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-method" className="text-fin-800 dark:text-fin-200">
                  Payment Method
                </Label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <SelectTrigger id="payment-method" className="h-12">
                    <div className="flex items-center gap-2">
                      {paymentMethod ? (
                        <>
                          <CreditCard className="h-4 w-4 text-fin-500 dark:text-fin-400" />
                          <SelectValue placeholder="Select payment method" />
                        </>
                      ) : (
                        <SelectValue placeholder="Select payment method" />
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="ach">ACH Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank" className="text-fin-800 dark:text-fin-200">
                  Bank
                </Label>
                <Select
                  value={bank}
                  onValueChange={setBank}
                >
                  <SelectTrigger id="bank" className="h-12">
                    <div className="flex items-center gap-2">
                      {bank ? (
                        <>
                          <Building className="h-4 w-4 text-fin-500 dark:text-fin-400" />
                          <SelectValue placeholder="Select your bank" />
                        </>
                      ) : (
                        <SelectValue placeholder="Select your bank" />
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chase">Chase</SelectItem>
                    <SelectItem value="bofa">Bank of America</SelectItem>
                    <SelectItem value="wells">Wells Fargo</SelectItem>
                    <SelectItem value="citi">Citibank</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-xs text-fin-500 dark:text-fin-400">
              <Lock className="h-3 w-3 mr-1" /> Transactions are secure
            </div>
            <Button 
              onClick={handleTransaction}
              disabled={isSubmitting || !amount || !paymentMethod || !bank}
              className="relative overflow-hidden bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-6"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Pay Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sage-100 dark:bg-sage-900 text-sage-600 dark:text-sage-300 mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-display font-medium mb-2">Payment Successful!</h2>
          <p className="text-fin-600 dark:text-fin-300 mb-6">
            Your transaction of ${amount} has been completed.
          </p>
          <p className="text-sm text-fin-500 dark:text-fin-400">
            Transaction details have been added to your transaction history.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaySection;
