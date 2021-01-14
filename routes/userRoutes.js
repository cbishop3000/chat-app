const router = require("express").Router()
const User = require("../models/userModel")
const Confirm = require("../models/confirmModel");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth")

router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordCheck, displayName } = req.body
        
        if(!email || !password || !passwordCheck || !displayName) {
            return res.status(400).json({ msg: "Not all fields have" })
        }

        if(password.length < 8) {
            return res.status(400).json({ msg: "Password needs to be at least 8 characters long!" })
        }

        if(password !== passwordCheck) {
            return res.status(400).json({ msg: "Passwords don't match!" })
        }

        const existingUser = await User.findOne({ email: email })

        if(existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists!" })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
        })

        const confirmToken = new Confirm({
            authorId: newUser._id,
            token: crypto.randomBytes(16).toString("hex"),
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "dontreplyvillage@gmail.com",
              pass: process.env.DONUT_REPLY_PASS,
            },
          });
      
          const mailOptions = {
            from: "dontreplyvillage@gmail.com",
            to: newUser.email,
            subject: "Confirm your account",
            text:
              "Thanks for signing up! Confirm your account here: \n http://localhost:3000/confirm_account/" +
              confirmToken.token,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        await confirmToken.save();
        const savedUser = await newUser.save()

        res.json(savedUser)
    } catch(err) {
        console.log(err)
        res.status(503).json({ error: err.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }

        const user = await User.findOne({ email: email })

        if(!user) {
            return res.status(400).json({ msg: "No account with this email has been registered" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials!" })
        }

        console.log(isMatch)

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })

        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
            }
        })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if(!user) return res.json(false)

        return res.json(true)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    
    if (!user.confirmed) {
      res.json({ confirmed: user.confirmed });
    } else {
      res.json({
        displayName: user.displayName,
        id: user._id,
        confirmed: user.confirmed,
      });
    }
  });

module.exports = router