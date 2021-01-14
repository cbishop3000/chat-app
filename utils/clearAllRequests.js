const router = require("express").Router()
const FriendRequests = require("../models/friendRequestModel")

router.post("/deleteallrequests", async (req, res) => {
    FriendRequests.deleteMany({}, () => {
        res.json("All Requests Deleted")
    })
})

module.exports = router

