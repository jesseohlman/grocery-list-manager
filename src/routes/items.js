const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");


router.post("/lists/:id/addItem", itemController.addItem);
router.post("/lists/:listId/deleteItem", itemController.deleteItem);
router.post("/lists/:listId/completeItem", itemController.complete);
router.get("/lists/:listId/item/:id", itemController.getItem);



module.exports = router;