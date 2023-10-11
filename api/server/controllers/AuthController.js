const User = require('../models/User')

module.exports.Register = async (req, res) => {
    
    const { Email, Password } = req.body;
    
    if(!Email) {
        return res.json({
            success: false,
            message: "Email field is empty"
        })
    }

    if(!Password) {
        return res.json({
            success: false,
            message: "Password field is empty"
        })
    }

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

module.exports.Login = async (req, res) => {
    
    try {
        const { Email, Password } = req.body;

        if(!Email) {
            return res.json({
                success: false,
                message: "Email field is empty"
            })
        }

        if(!Password) {
            return res.json({
                success: false,
                message: "Password field is empty"
            })
        }

        const checkUser = await User.findOne({Email});
        if(!checkUser) {
            return res.json({
                success: false,
                message: "User with requested email doensnt exist"
            })
        }

        const checkPassword = await checkUser.ComparePasswords(Password);
        if(!checkPassword) {
            return res.json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = checkUser.GenerateJWT();
        res.cookie('token', token, { maxAge: 900 * 1000, httpOnly: true})
        .json({
                success: true,
                token
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
            stack: error.stack
        })
    }
}   

module.exports.UserProfile = async (req, res) => {
    const userProfile = await User.findById(req.user.id);
    
    res.json({
        success: true,
        userProfile
    })
}
