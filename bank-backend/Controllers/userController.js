const users = require('../Models/userSchema')
// import token
const jwt =require('jsonwebtoken')

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { username, email, password, accountNumber, isAdmin } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            accountNumber,
            isAdmin,
            balance: "",
            address: "",
            phoneNumber: ""
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json('Registration Failed...');
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser && await bcrypt.compare(password, existingUser.password)) { // Compare hashed passwords
            const token = jwt.sign(
                { userid: existingUser._id },
                "super2024",
                { expiresIn: '1h' }
            );
            res.status(200).json({ existingUser, token });
        } else {
            res.status(404).json("Invalid email or password");
        }
    } catch (err) {
        res.status(500).json("Login failed: " + err);
    }
};
// exports.login =async(req,res)=>{
//     // accep data from client
//     const {email,password}=req.body
//     try{
//         const existingUser=await users.findOne({email,password})
//         if(existingUser){
//             const token= jwt.sign({userid:existingUser._id},"super2024")
//             console.log(token);
//             res.status(200).json({existingUser,token})
//         }else{
//             res.status(404).json("Invalid email or password")
//         }

//     }
//     catch(err){
//         res.status(500).json("login failed"+err)
//     }
// }

// exports.register = async (req, res) => {
//     console.log("inside register method");
//     const { username, email, password, accountNumber, isAdmin } = req.body; // Ensure isAdmin is destructured
//     console.log(username, email, password, accountNumber, isAdmin); // Log isAdmin to check the value

//     try {
//         // Check if the email is already registered
//         const existingUser = await users.findOne({ email });
//         console.log(existingUser);
//         if (existingUser) {
//             return res.status(406).json('already registered');
//         } else {
//             const newUser = new users({
//                 username,
//                 email,
//                 password,
//                 accountNumber,
//                 isAdmin,  // Include isAdmin here
//                 balance: "",
//                 address: "",
//                 phoneNumber: ""
//             });
//             await newUser.save();
//             res.status(200).json(newUser);
//         }
//     } catch (err) {
//         res.status(500).json('Register Failed: ' + err.message);
//     }
// };



// exports.register=async(req,res)=>{
//     console.log("inside register method");
//     const {username,email,password,accountNumber}= req.body
//     console.log(username,email,password,accountNumber);
//     // accept data from client
//     try{

//         // check if the email is already registerd
//         const existingUser = await users.findOne({email})
//         console.log(existingUser);
//         if(existingUser){
//             res.status(406).json('already registered')
//         }else{
//             const newUser = new users({
//                 username,
//                 email,
//                 password,
//                 accountNumber,
//                 balance:"",
//                 address:"",
//                 phoneNumber:""

//             })
//             await newUser.save()
//             res.status(200).json(newUser)
//         }
       
//     }
//     catch(err){
//         res.status(500).json('Register Failed...')
//     }
// }


// login logic


// exports.login =async(req,res)=>{
//     // accep data from client
//     const {email,password}=req.body
//     try{
//         const existingUser=await users.findOne({email,password})
//         if(existingUser){
//             const token= jwt.sign({userid:existingUser._id},"super2024")
//             console.log(token);
//             res.status(200).json({existingUser,token})
//         }else{
//             res.status(404).json("Invalid email or password")
//         }

//     }
//     catch(err){
//         res.status(500).json("login failed"+err)
//     }
// }

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const existingUser = await users.findOne({ email, password });
//         if (existingUser) {
//             const token = jwt.sign(
//                 { userid: existingUser._id, isAdmin: existingUser.isAdmin },  // Include isAdmin in the token
//                 "super2024",
//                 { expiresIn: '1h' }
//             );
//             res.status(200).json({ existingUser, token });
//         } else {
//             res.status(404).json("Invalid email or password");
//         }
//     } catch (err) {
//         res.status(500).json("Login failed: " + err);
//     }
// };
exports.getUserDetails = async (req, res) => {
    const userId=req.payload
    try {
        const user = await users.findById(userId);
        if (!user) return res.status(404).json('User not found');

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('Error fetching user details: ' + err.message);
    }
    }
