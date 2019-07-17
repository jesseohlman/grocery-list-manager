const User = require("../db/models").user;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


const passport = require("passport");

module.exports = {
    create(req, res, next){
        [
            check('email', 'not email').isEmail(),
        check('password', 'password too short').isLength({min: 6})
        ], (req, res, ) => {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return res.json({ errors: errors.array() });
            }
         } //validation
       
        User.findOne({where: {email: req.body.email}})
            .then((user) => {
                if(!user){
                    const salt = bcrypt.genSaltSync();
                    var hashedPassword = bcrypt.hashSync(req.body.password, salt);

                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    .then((user) => {
                        res.json({message: "You've created an account! Go ahead and sign in!"});
                    })  
                } else {
                    res.json({message: "There is already a user with that email"});
                }
            })
            .catch((err) => {
                console.log(err);
                res.end();
            })
            
    },

    currentUser(req, res, next){
        if(req.user){
            res.json(req.user);
        } else {
            res.json({id: undefined});
        }
    },

    signin(req, res, next){
        passport.authenticate('local', function(err, user, info){
            if(err){
                res.json({message: "Invalid email or password."})

                return next(err);
            }
            if(!user){
                res.json({message: "Invalid email or password."})

                return next(err);
            }
                req.logIn(user, function(err) {
                    if (err) { 
                        res.json({message: "Invalid email or password."})
                        return next(err); 
                    }
                    res.json({message: "You've been signed in!"});
                });
        })(req, res, next);
        
    },

    signOut(req, res, next){
        req.session.destroy(function (err) {
            res.json({signedOut: true});
        });
    }
}