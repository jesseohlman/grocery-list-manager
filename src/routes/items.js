const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");


router.post("/lists/:listId/items/submit", itemController.new);

module.exports = router;