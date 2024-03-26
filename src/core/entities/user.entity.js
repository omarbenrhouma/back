const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'user',enum: ['user', 'admin'] },
  mission:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
