const jwt =require('jsonwebtoken')
// token verification
const users = require('../Models/userSchema');




const jwtMiddleware=(req,res,next)=>{
   //  console.log("inside jwtmidlleware");
 try{
       // get the token
       const token=req.headers['authorization'].slice(7)
       console.log(token);
       // verify the token
       const jwtVerification=jwt.verify(token, "super2024")
       console.log(jwtVerification);//payload-userdid
       req.payload=jwtVerification.userid
       next()
 }
 catch (err) {
    res.status(401).json({"Authorization Error":err.message})
 }
}
module.exports=jwtMiddleware

// const jwt = require('jsonwebtoken');
// const users = require('../Models/userSchema');

// // JWT middleware to verify token
// const jwtMiddleware = async (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) return res.status(403).json('Access Denied. No token provided');

//   try {
//     const bearerToken = token.split(" ")[1]; // Ensure the token has 'Bearer ' prefix
//     if (!bearerToken) return res.status(400).json('Invalid token format');

//     const decoded = jwt.verify(bearerToken, "super2024"); // Verifying token
//     const user = await users.findById(decoded.userid);

//     if (!user) return res.status(404).json('User not found');

//     req.user = user; // Attach user info to the request object
//     next();
//   } catch (err) {
//     res.status(401).json('Invalid token');
//   }
// };

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.isAdmin === 'true') {
//     next(); // Allow admin to proceed
//   } else {
//     res.status(403).json('Admin access required');
//   }
// };

// module.exports = { jwtMiddleware, isAdmin };



// const jwt = require('jsonwebtoken');

// // Middleware to check for admin role
// exports.verifyAdmin = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json('Access Denied. No token provided.');

//     try {
//         const decoded = jwt.verify(token.split(' ')[1], "super2024");
//         if (decoded.isAdmin) {
//             req.user = decoded;
//             next();
//         } else {
//             res.status(403).json('Access Denied. Not an admin.');
//         }
//     } catch (err) {
//         res.status(400).json('Invalid token.');
//     }
// };
