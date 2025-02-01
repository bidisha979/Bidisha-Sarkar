const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/portfoliodb")
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;