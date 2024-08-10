const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretkey = process.env.WhatIsYourName



const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if(!token) {
        return res.status(401).json({error: "Token is required"});
    }
    try {
        const decoded = jwt.verify(token, secretkey)
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({error: "user not found"})
        }
        req.userId = user._id
          
        next()

    } catch (error) {
             console.error(error)
             return res.status(500).json({ error: "Invalid token"});
    }

}

module.exports = verifyToken