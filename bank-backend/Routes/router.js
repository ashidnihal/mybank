const express =require('express')
const userController = require('../Controllers/userController')
const transactionController = require('../Controllers/transactionControl');
const adminController = require('../Controllers/adminControl')

// import jwt
// const  { jwtMiddleware, isAdmin } =require('../Middleware/jwtMiddleware')

const  jwtMiddleware=require('../Middleware/jwtMiddleware')

const router = express.Router()

//register
router.post('/register',userController.register)
// login api call
router.post('/login',userController.login)
// admin login
// router.post('/login/admin',jwtMiddleware,isAdmin,userController.login);
// user details
router.get('/user/details',jwtMiddleware,userController.getUserDetails)
// Deposit
router.post('/user/deposit', jwtMiddleware, transactionController.deposit);
// withdraw
router.post('/user/withdraw', jwtMiddleware, transactionController.withdraw);
//user transaction
router.get('/user/transactions', jwtMiddleware, transactionController.getUserTransactions);

// all user
router.get('/admin/users',jwtMiddleware,adminController.getAllUsersadmin)
// all transaction
router.get('/admin/users/transaction',jwtMiddleware,adminController.getAllUsersTransaction)
// sendmoney
router.post('/user/sendmoney', jwtMiddleware,transactionController.sendMoney); 
module.exports = router;
