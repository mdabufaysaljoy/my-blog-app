const router = require("express").Router();

router.get("/play", (req, res, next) => {
  res.render("playground/play.ejs", { title: "playground", flashMessage: {} });
});
router.post("/play", (req, res, next) => {
  res.redirect("/playground/play");
});

module.exports = router;
