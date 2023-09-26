const express = require("express");
const baseController = require("../controllers/base.controller");

const router = express.Router();

router.get("/", baseController.getHome)

router.get("/401", baseController.get401)

router.get("/403", baseController.get403)

module.exports = router;