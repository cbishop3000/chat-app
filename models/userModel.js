const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true, minLength: 5 },
    displayName: { type: String, required: true },
    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    friendRequest: [{
        type: mongoose.Schema.ObjectId,
            ref: 'User'
    }],
    requestSent: [{
        type: mongoose.Schema.ObjectId,
            ref: 'User'
    }],
    isOnline: {
        type: false
    },
    confirmed: false,
})

module.exports = User = mongoose.model("user", userSchema);