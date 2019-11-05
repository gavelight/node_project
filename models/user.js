const mongoose = require('mongoose');

// Defining the user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

// Returning the model
module.exports = mongoose.model("User", userSchema);