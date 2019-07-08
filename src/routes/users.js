const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { check, validationResult } = require('express-validator');


router.post("/users/submit", [
    check('email', 'not email').isEmail(),
check('password', 'password too short').isLength({min: 6})
], (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        console.log("error: in sign up");
        return res.json({ errors: errors.array() });
    } else {
        next()
    }
 }, userController.create);
router.post("/users/signIn", userController.signin);
router.get("/users/signOut", userController.signOut);
router.get("/users", userController.currentUser);



module.exports = router;