const mongoose = require('mongoose')

var connectDB = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.DB_SECRET, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    console.log('Connected to user database')
  } catch (error) {
    console.log('Could not connect to db')
  }
}

module.exports = connectDB
