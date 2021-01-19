const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }]
})

module.exports = Room = mongoose.model('room', roomSchema)