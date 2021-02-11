const {
  registerUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
} = require('../controllers/userController')
const auth = require('../middlewares/auth')
const { validateUser } = require('../validations/validations')

const router = require('express').Router()

router.post('/register', validateUser, registerUser)

router.get('/login', loginUser)
router.get('/users', getUsers)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.patch('/:id', auth, updateUser)

module.exports = router
