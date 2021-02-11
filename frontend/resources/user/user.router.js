var express = require("express");

var controllers = require("./user.controllers");

const router = express.Router();

router.route("/").get(controllers.getMe).put(controllers.updateMe);

module.exports = router;
