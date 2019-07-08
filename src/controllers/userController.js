const User = require("../db/models").user;
const bcrypt = require('bcrypt');


const passport = require("passport");

module.exports = {
    create(req, res, next){
        console.log("\n hit user create \n");
       
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
                    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/signUp/'})(req, res);
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
        console.log(`email: ${req.body.password}`);
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/signUp/'})(req, res);
    },

    signOut(req, res, next){
        req.session.destroy(function (err) {
            console.log("User has been signed out!");
            res.redirect('/'); 
          });
    }
}