const express = require('express')
const connectDB = require('./api/config/db')
const privateAuth = require('./api/middlewares/privateAuth')
const userRoute = require('./api/routes/userRoute')
const app = express()

require('dotenv/config')

connectDB()

app.use(express.json())

app.use('/api', userRoute)

app.use('/api', privateAuth)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
