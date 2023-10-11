const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minLength: [6, 'Password must contain 6 charachters']
    },
    Role: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('Password'))
        next();

    this.Password = await bcrypt.hash(this.Password, 10);
})

UserSchema.methods.GenerateJWT = function() {
    return jwt.sign(
        { email: this.Email, role: this.Role },
        process.env.JWT_SECRET,
        { expiresIn: 900 }
    )
}

module.exports = mongoose.model("User", UserSchema);