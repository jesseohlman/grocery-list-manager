const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const user = require("../db/models").user;

module.exports = {

    init(app){

        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy({usernameField: "email"},
            function(email, password, done) {
            user.findOne({ where: {email: email} })
            .then((user) => {
                if (!user) {return done(null, false, {message: 'Invalid emsil or password.'}); }
                
                if(!bcrypt.compareSync(password, user.password)){ 
                    return done(null, false, {message: 'Invalid emsil or password.'}); 
                } 
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            })
        }));

        passport.serializeUser((user, callback) => {
            callback(null, user.id);
          });
      
          passport.deserializeUser((id, callback) => {
            user.findOne({where: {id: id}})
            .then((user) => {
              callback(null, user);
            })
            .catch((err =>{
              callback(err, user);
            }))
    });
    }
}