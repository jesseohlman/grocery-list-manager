require("dotenv").config();

const passposrtConfig = require("./passport");
const session = require("express-session");
const logger = require("morgan");
const path = require("path");

module.exports = {
    
    init(app, express){
        app.use(logger('dev'));

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(session({
            secret: process.env.cookieSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 1.21e+9}
        }));
        passposrtConfig.init(app);
        app.use((req, res, next) => {
            res.locals.currentUser = req.user;       
            next();
        })
    }
}