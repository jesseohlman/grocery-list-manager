const User = require("../db/models").user;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


const passport = require("passport");

module.exports = {
    create(req, res, next){
        console.log("\n hit user create \n");
        [
            check('email', 'not email').isEmail(),
        check('password', 'password too short').isLength({min: 6})
        ], (req, res, ) => {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                console.log("error: in sign up");
                return res.json({ errors: errors.array() });
            }
         }
       
                User.findOne({where: {email: req.body.email}})
                .then((user) => {
                    if(!user){
                        console.log("in user create user.")

                
                const salt = bcrypt.genSaltSync();
                var hashedPassword = bcrypt.hashSync(req.body.password, salt);

                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                .then((user) => {
                    res.json({errors: [{msg: "You've created an account! Go ahead and sign in!"}]});

                })
                .catch((err) => {
                    console.log(err);
                });

                   
            } else {
                res.json({errors: [{msg: "There is already a user with that email"}]});
            }
        })
            
    },

    currentUser(req, res, next){
        if(req.user){
            console.log("yes req.user")
            res.json(req.user);
        } else {
            console.log("no req.user")

            res.json({id: undefined});
        }
    },

    signin(req, res, next){
        passport.authenticate('local', function(err, user, info){
            if(user){

                req.logIn(user, function(err) {
                    if (err) { 
                        res.json({message: "Invalid email or password."})
                        return next(err); 
                    }
                    res.json({message: "You've been signed in!"})
                    return next(user);

                });
            } else {
                res.json({message: "Invalid email or password."})

                return next(err);
            }
        })(req, res);
        
    },

    signOut(req, res, next){
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    }
}