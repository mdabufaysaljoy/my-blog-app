const { body } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

module.exports = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("please enter a valid email"),
  body("password")
    .not().isEmpty().withMessage("please enter your password")
];
