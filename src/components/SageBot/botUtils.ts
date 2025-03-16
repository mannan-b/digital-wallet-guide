
import { Message } from './types';

export const simulateBotResponse = (
  userMessage: string,
  callback: (botMessage: Message) => void,
  setIsTyping: (isTyping: boolean) => void
) => {
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
    
    callback(newBotMessage);
    setIsTyping(false);
  }, 1500); // Simulate thinking time
};
