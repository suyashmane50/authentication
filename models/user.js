const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
module.exports = mongoose.model('User', userSchema);
