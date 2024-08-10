
const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const dotEnv = require('dotenv');




dotEnv.config();

const secretkey = process.env.WhatIsYourName

// user registration //
const userRegister = async (req,res)=>{
    const {username, email, password} = req.body;
    try{

        const userEmail = await User.findOne({email});
        if (userEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword

        });
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
        console.log('registered')
        

    }catch (error) {
        console.error(error);
        
        res.status(500).json({error: "Internal server error"})


    }
}

// userlogin process   using ! not operator and || or operator// 
const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
       if(!user ||  !(await bcrypt.compare(password, user.password))){           
        return res.status(401).json({error : "Invalid username or password"})
       }
       const token = jwt.sign({userId: user._id}, secretkey ,{expiresIn:"1h"})

       res.status(200).json({ success: "Login successful", token })
       console.log(email, "this is token", token);
       

    } catch (error) {
        console.log(eror);
        res.status(500).json({ error : "Internal server error"});
        

    }
}
// function to get all users  with their associated firms ie records//
const getUsersWithFirms = async(req, res)=>{
    try{
        //Fetch users and populate the firm field //
        const users = await User.find().populate('firm');
        res.status(200).json(users); // Send users with populated firms as JSON response //
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error"})
    }
}

//  fetch single user record through api by userId//
// for firmName ki populate method is used //
const getUserById = async(req,res)=>{
    const userId = req.params.apple;
    try{
        const user = await User.findById(userId).populate('firm');
        if(!user) {
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({user})
    }catch  (error){
        console.log(error);
        res.status(500).json({ error: "Internal server error"})
    }
    
}


module.exports = { userRegister, userLogin, getUsersWithFirms, getUserById };