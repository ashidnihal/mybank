const users = require('../Models/userSchema')
// import token
const jwt =require('jsonwebtoken')

exports.register=async(req,res)=>{
    console.log("inside register method");
    const {username,email,password,accountNumber}= req.body
    console.log(username,email,password,accountNumber);
    // accept data from client
    try{

        // check if the email is already registerd
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json('already registered')
        }else{
            const newUser = new users({
                username,
                email,
                password,
                accountNumber,
                balance:"",
                address:"",
                phoneNumber:""

            })
            await newUser.save()
            res.status(200).json(newUser)
        }
       
    }
    catch(err){
        res.status(500).json('Register Failed...')
    }
}


// login logic


exports.login =async(req,res)=>{
    // accep data from client
    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token= jwt.sign({userid:existingUser._id},"super2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }else{
            res.status(404).json("Invalid email or password")
        }

    }
    catch(err){
        res.status(500).json("login failed"+err)
    }
}

// exports.loginAdmin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         // Admin credentials should be securely stored
//         const adminEmail = process.env.ADMIN_EMAIL; // Store admin email in environment variables
//         const adminPassword = process.env.ADMIN_PASSWORD; // Store plaintext admin password in environment variables

//         // Check if provided credentials match admin credentials
//         if (email === adminEmail && password === adminPassword) {
//             const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.status(200).json({ token });
//         } else {
//             res.status(404).json('Invalid email or password');
//         }
//     } catch (err) {
//         res.status(500).json('Login Failed: ' + err.message);
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
