const router = require("express").Router();

const { dasboardGetController } = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, dasboardGetController);

module.exports = router;
