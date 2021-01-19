const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    to: {
        type: Schema.Types.ObjectId,
        required: "User"
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Message = mongoose.model('messages', MessageSchema)