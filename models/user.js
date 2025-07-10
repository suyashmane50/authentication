const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect((process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Connection error:", err));
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
module.exports = mongoose.model('User', userSchema);
