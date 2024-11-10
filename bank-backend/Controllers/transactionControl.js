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

exports.sendMoney = async (req, res) => {
    const { amount, recipientAccount } = req.body;  // Get recipient account number and amount from the request body
    const userId = req.payload;  // Get the user making the transaction

    try {
        // Find sender (user making the transaction)
        const sender = await User.findById(userId);
        if (!sender) return res.status(404).json({ message: 'Sender not found' });

        // Check if sender has enough balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Find recipient by account number
        const recipient = await User.findOne({ accountNumber: recipientAccount });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Deduct amount from sender's balance
        sender.balance -= amount;
        await sender.save();

        // Add amount to recipient's balance
        recipient.balance += amount;
        await recipient.save();

        // Record the transaction for the sender
        const senderTransaction = new Transaction({
            userId: userId,
            type: 'send',
            amount,
            description: `Sent to account number ${recipientAccount}`
        });
        await senderTransaction.save();

        // Record the transaction for the recipient
        const recipientTransaction = new Transaction({
            userId: recipient._id,
            type: 'receive',
            amount,
            description: `Received from user with account number ${sender.accountNumber}`
        });
        await recipientTransaction.save();

        res.status(200).json({ message: 'Money sent successfully', transaction: senderTransaction });
    } catch (err) {
        res.status(500).json({ message: 'Sending money failed', error: err.message });
    }
};