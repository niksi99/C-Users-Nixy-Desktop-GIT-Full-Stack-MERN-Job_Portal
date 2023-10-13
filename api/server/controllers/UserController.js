const User = require('../models/User');

module.exports.UserProfile = async (req, res) => {
    const userProfile = await User.findById(req.user.id);
    
    res.json({
        success: true,
        userProfile
    })
}

module.exports.GetAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find({})
        res.json({
            success: true,
            allUsers
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
            stack: error.stack
        })
    }
}