const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bidisha:0420@bidishaproject.rgyjmyb.mongodb.net/?retryWrites=true&w=majority&appName=bidishaproject")
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;