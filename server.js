const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 6000;

const userRoutes = require("./routes/userRoutes")
const friendRoutes = require("./routes/friendRequestRoutes")
const deleteFriendRequests = require("./utils/clearAllRequests")

// setup express
app.use(express.json({ extended: true }));
app.use(cors());

// setup mongoose
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// setup routes

app.use("/users", userRoutes);
app.use("/friends", friendRoutes)
app.use("/utils", deleteFriendRequests)

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));

