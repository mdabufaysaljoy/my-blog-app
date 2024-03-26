const { body } = require("express-validator");
const User = require("../../models/User");

module.exports = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("username must be between 2 to 15 caracter")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("user is already exist");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("please provide a valid email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("email is already exist");
      }
      return true;
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be grater than 5 character"),
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("password doesn't match")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("password dosen't match");
      }
      return true;
    }),
];
