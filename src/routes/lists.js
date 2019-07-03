const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController");


router.post("/lists/create", listController.new);
router.get("/lists/select", listController.select);
router.get("/lists/:id/view", listController.view);




module.exports = router;