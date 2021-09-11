const router = require("express").Router();
const passport = require("../passport")
router.get("/", passport.authenticate("discord", {failureRedirect: "/"}), (req, res, next) => {
  res.redirect("/")
});

module.exports = router;