const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name!',
  },
  email: {
    type: String,
    required: 'Email field cannot be empty!',
  },
  password: {
    type: String,
    required: 'Please enter the password also!',
  },
  contact: {
    type: Number,
    required: 'Enter contact !!!',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
})

User.pre('save', async function (req, res, next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('users', User)
