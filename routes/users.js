var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const AUTH_CONTROLLER = require("../auth/controller/auth.controller");

router.post("/signup", AUTH_CONTROLLER.registration);

module.exports = router;
