const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");


router.post("/items/submit", function(){console.log(`body: ${response.json()}`)});

module.exports = router;