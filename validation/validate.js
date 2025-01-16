// const { body } = require('express-validator');
// const  validationResult= require('express-validator');
// const signupValidation = [
//     body('email').isEmail().withMessage('Enter a valid email address'),
//     body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
// ];

// const validate = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// module.exports = {  validate };
