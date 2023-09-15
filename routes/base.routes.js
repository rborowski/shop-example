const express = require("express");
const baseController = require("../controllers/base.controller");

const router = express.Router();

router.get("/", baseController.getHome)

module.exports = router;