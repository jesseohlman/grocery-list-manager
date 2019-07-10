const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { check, validationResult } = require('express-validator');


router.post("/users/submit", userController.create);
router.post("/users/signIn", userController.signin, function(req, res){
    console.log("passport user", req.user);});
router.get("/users/signOut", userController.signOut);
router.get("/users", userController.currentUser);



module.exports = router;