const express = require("express");
const router = express.Router();
const rateController = require("../controllers/rates");

router.route("/").get(rateController)
module.exports = router;