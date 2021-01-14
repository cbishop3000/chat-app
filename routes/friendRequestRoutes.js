const router = require('express').Router()
const Friends = require('../models/friendRequestModel')
const User = require("../models/userModel")
const auth = require("../middleware/auth")

router.get("/test", auth, async (req, res) => {
    try {
        console.log(req.user)
        res.send({ msg: "success", user: req.user })
    } catch(err) {
        res.send(err);
    }
})

router.post("/sendrequest", auth, async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email: email })

        const requestUser = await User.findOne({ _id: req.user })

        if(!user) {
            return res.status(400).json({ msg: "No account with this email has been registered!" })
        }

        if(user.email == requestUser.email) {
            return res.status(400).json({ msg: "Can't send yourself a friend request!"})
        }

        if(user.friendRequest.includes(requestUser._id)) {   
            return res.status(400).json({ msg: "You've already sent this user a friend request!", 
            alreadySent: {
                user: user.friendRequest,
                request: requestUser._id
            }})
        }

        if(user.friends.includes(requestUser._id)) {
            return res.status(400).json({ msg: "You're already friends with this user!" })
        }

        const newFriendRequest = new Friends({
            sender: requestUser,
            recipient: user._id,
            status: false
        })

        if(newFriendRequest.sender == user.friendRequest) {
            return res.status(400).json({ msg: "You've already sent this user a friend request!" })
        } else {
            user.friendRequest.push(newFriendRequest.sender)

            requestUser.requestSent.push(newFriendRequest.recipient)

            user.save()
            requestUser.save()
        }

        res.status(201).json({
            receivingUser: {
                sentFrom: newFriendRequest.sender,
                id: user._id,
                requests: user.friendRequest
            }, 
            request: newFriendRequest
        })         

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/getusersrequests", auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user })
        res.json({ friendRequest: user.friendRequest }) 
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/acceptfriendrequest", auth, async (req, res) => {
    try {
        const { request } = req.body

        if(!request) {
            return res.status(400).json({ msg: "No friend request in body!" })
        }

        const sender = await User.findOne({ _id: request })

        const user = await User.findOne({ _id: sender.requestSent })

        await user.friends.push(user.friendRequest)
        await sender.friends.push(sender.requestSent)
        await user.friendRequest.remove(request)
        await sender.requestSent.remove(sender.requestSent)
        await user.save()
        await sender.save()

        res.json({user: user, sender: sender})

    } catch(err) {
        res.send(err)
    }
})

router.post("/deletefriendrequest", auth, async (req, res) => {
    try {
        const { request } = req.body

        if(!request) {
            return res.status(400).json({ msg: "No friend request in body!" })
        }

        const removeUser = await User.findOne({ _id: req.user })

        await removeUser.friendRequest.remove(request)
        await removeUser.save()

        res.json({ msg: "Friend Request Deleted!" })

    } catch(err) {
        res.send(err)
    }
    
})

router.post("/getfriends", auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user })

        res.json({ friends: user.friends }) 
    } catch(err) {
        res.send(err)
    }
})

module.exports = router