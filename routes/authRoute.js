const router = require("express").Router();
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");
const { isUnAuthenticated } = require("../middleware/authMiddleware");
const {
  signupGetController,
  loginGetController,
  logoutController,
  signupPostController,
  loginPostController,
} = require("../controllers/authController");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post(
  "/signup",
  isUnAuthenticated,
  signupValidator,
  signupPostController
);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
