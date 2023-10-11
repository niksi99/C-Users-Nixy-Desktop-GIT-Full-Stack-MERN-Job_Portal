const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.IsAuthenticated = async(req, res, next) => {

    const { token } = req.cookies
    console.log(token)
    if(!token) {
        return res.json({
            success: false,
            message: "invalid token"
        })
    }

    try {
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken)
        if(!decodedToken) {
            return res.json({
                success: false,
                message: "invalid decodedToken"
            })
        }
        req.user = await User.findOne({Email: decodedToken.email});
        console.log(req.user)
        next();

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
            stack: error.stack
        })
    }
}