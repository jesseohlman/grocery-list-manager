const express = require("express");
const router = express.Router();;

const listController = require("../controllers/listController");

router.post("/lists/submit", listController.new);

module.exports = router;