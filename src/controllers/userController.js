const user = require("../db/models").user;
const bcrypt = require('bcrypt');

const passport = require("passport");

module.exports = {
    create(req, res, next){
        const salt = bcrypt.genSaltSync();
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        .then((user) => {
            passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
        })
        .catch((err) => {
            console.log(err);
        });

        
    },

    show(req, res, next){
        console.log(`req.user: ${req.user}`)
        user.findAll()
        .then((users) => {
           
            if(users){
                res.json(users);

            //now users can be accessed through res.json() with a get req
            }
             
            
        })
        .catch((err) => {
            console.log(err);
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
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/lists/items/add/'})(req, res);
    },

    signOut(req, res, next){
        req.session.destroy(function (err) {
            console.log("User has been signed out!");
            res.redirect('/'); 
          });
    }
}