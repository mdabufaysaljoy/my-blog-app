const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Flash = require("../utils/Flash");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup.ejs", {
    title: "Create a new account",
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req),
  });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    req.flash("fail", "please check your form");
    return res.render("pages/auth/signup.ejs", {
      title: "create a new account",
      error: errors.mapped(),
      value: { username, email, password },
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 11);
    let user = new User({ username, email, password: hashedPassword });
    await user.save();
    req.flash("success", "user created successfully");
    res.redirect("/auth/login.ejs");
  } catch (e) {
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login.ejs", {
    title: "login your existing accoutn",
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req),
  });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    req.flash("fail", "please check your form");
    return res.render("pages/auth/login", {
      title: "login your existing account",
      error: errors.mapped(),
      value: { email, password },
      flashMessage: Flash.getMessage(req),
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      req.flash("fail", "please provide valid credantials");
      return res.render("pages/auth/login", {
        title: "login your existing account",
        error: { email: "email not found" },
        value: { email, password },
        flashMessage: Flash.getMessage(req),
      });
    }
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("fail", "please provide valid credantials");
      return res.render("pages/auth/login", {
        title: "login your existing account",
        error: { password: "password doesn't match" },
        value: { email, password },
        flashMessage: Flash.getMessage(req),
      });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((error) => {
      if (error) {
        console.log(error);
        return next();
      }
      req.flash("success", "success fully logged in");
      res.redirect("/dashboard");
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutController = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    return next();
  });
  req.flash("success", "success fully logout");
  return res.redirect("/auth/login");
};
