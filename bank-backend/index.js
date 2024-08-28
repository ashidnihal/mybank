require('dotenv').config() // 1.Loads .env file contents into process.env by default.

//2 import express
const express=require('express')
// 3.import cors
const cors =require('cors')
// 7.import db
const db = require('./DB/connection')
// 8.import router
const router =require('./Routes/router')
// const applicationMiddleware=require('./Middleware/applicationMiddleware')

// 4. create a appliction using express
const bkserver =express()
// 5.use
bkserver.use(cors())
bkserver.use(express.json())
// bkserver.use(applicationMiddleware)
bkserver.use(router)

const PORT =4000 || process.env.PORT

bkserver.listen(PORT,()=>{
    console.log('bkserver listening on port '+PORT);
})

bkserver.get('/',(req,res)=>{
    res.send('welcome to MY bank')
})