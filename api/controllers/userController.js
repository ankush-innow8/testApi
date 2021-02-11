const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res, next) => {
  try {
    const isEmail = await User.findOne({ email: req.body.email })
    if (isEmail) return res.json({ err: 'Already exists' })
    const user = await new User(req.body)
    await user.save()
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const isEmail = await User.findOne({ email: req.body.email })
    if (!isEmail) return res.json({ err: 'Email does not exist' })

    const isMatch = bcrypt.compare('password', isEmail.password)
    if (!isMatch) return res.json({ err: 'Wrong Password' })

    const token = jwt.sign({ _id: isEmail.id }, process.env.SECRET_KEY)
    res.header('x-auth-token', token).json({ token, userData: isEmail })
  } catch (error) {}
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select({ password: 0 })
    res.json(users)
  } catch (error) {
    res.send(error.message)
  }
}

const getUser = async (req, res, next) => {
  try {
    const isUser = await User.findOne({ _id: req.params.id })
    if (!isUser) return res.json({ err: 'User doesnot exist' })
    res.json(isUser)
  } catch (error) {
    res.send(error.message)
  }
}
const updateUser = async (req, res, next) => {
  const { name, contact, isAdmin, password } = req.body
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    console.log(user)
    if (user) {
      user.name = name ?? user.name
      user.contact = contact ?? user.contact
      user.password = password ?? user.password
      user.isAdmin = isAdmin ?? user.isAdmin
    }
    await user.save()
    console.log(user)
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id
    if(userId != req.user)
  try {
    const user = await User.findOneAndRemove(
      { _id: req.params.id },
      { new: true }
    )
    res.json(user)
  } catch (error) {
    res.json(user)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
}
