const Transaction = require('../Models/transactionSchema');
const User = require('../Models/userSchema');

exports.deposit = async (req, res) => {
    const {  amount } = req.body;
    const userId = req.payload
    try {
     
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.balance += amount;
      await user.save();
  
      
      const transaction = new Transaction({ userId, type: 'deposit', amount });
      await transaction.save();
  
      res.status(200).json(transaction);
    } catch (err) {
      res.status(500).json({ message: 'Deposit failed', error: err.message });
    }
  };

  exports.withdraw = async (req, res) => {
    const { amount } = req.body;
    const userId = req.payload

    try {
        const user = await User.findById(userId); 
        if (!user) return res.status(404).json({ message: 'User not found' });

        
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        
        user.balance -= amount;
        await user.save();

        // Record the transaction
        const transaction = new Transaction({ userId: req.payload, type: 'withdrawal', amount });
        await transaction.save();

        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Withdrawal failed', error: err.message });
    }
};


;

exports.getUserTransactions = async (req, res) => {
    const userId = req.payload; 

    try {
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        if (!transactions) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve transactions', error: err.message });
    }
};
