const Transaction = require('../Models/transactionSchema');
const User = require('../Models/userSchema');

exports.getAllUsersadmin = async (req, res) => {
    const search=req.query.search
    console.log(search);
  
        let query={}
        if(search){
            query.username = {$regex:search,$options:"i"}
        }
    try {
      const user = await User.find(query);
      if(user){
        res.status(200).json(user);
      }else{
        res.status(401).json("Can't find the User")
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };




exports.getAllUsersTransaction = async (req, res) => {
    const search = req.query.search;
    console.log(search);

    let transactionQuery = {};

    try {
        
        if (search) {
            const users = await User.find({ username: { $regex: search, $options: "i" } });
            if (users.length > 0) {
               const userIds = users.map(user => user._id);
                transactionQuery.userId = { $in: userIds };
            } else {
                return res.status(404).json("No users found");
            }
        }

        const transactions = await Transaction.find(transactionQuery).populate('userId', 'username');

        if (transactions.length > 0) {
            res.status(200).json(transactions);
        } else {
            res.status(404).json("No transactions found");
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
