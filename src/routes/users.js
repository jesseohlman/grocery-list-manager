const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { check, validationResult } = require('express-validator');


router.post("/users/submit", [
    check('name', 'you must enter a name').isLength({min: 1}),
    check('email', 'not a valid email').isEmail(),
    check('password', 'password too short').isLength({min: 6})
], (req, res, ) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        res.json({ errors: errors.array() });
        res.end();
    }
 }, //validates user inputs
 userController.create);

router.post("/users/signIn", userController.signin);
router.get("/users/signOut", userController.signOut);
router.get("/users", userController.currentUser);



module.exports = router;