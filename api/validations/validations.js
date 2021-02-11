const { check, validationResult } = require('express-validator')

exports.validateUser = [
  check('email')
    .notEmpty()
    .withMessage('cant be empty')
    .isEmail()
    .withMessage('wrong email'),
  check('password')
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage('Password length should be between 6 and 12'),
  check('name').notEmpty(),
  check('contact').isLength({ min: 10, max: 10 }),

  (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.json([
        {
          err: result.array(),
        },
      ])
    }
    next()
  },
]
