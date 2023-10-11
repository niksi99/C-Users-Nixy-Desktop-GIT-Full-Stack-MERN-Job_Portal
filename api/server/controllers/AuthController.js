const User = require('../models/User')

module.exports.Register = async (req, res) => {
    
    const { Email } = req.body;
    const checkUser = await User.findOne({Email});
    if(checkUser) {
        return res.json({
            success: false,
            message: "User with requested email doensnt exist"
        })
    }

    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            success: true,
            message: "User created",
            newUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
            stack: error.stack
        })
    }
}
