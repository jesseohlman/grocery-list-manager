

module.exports = {
    init(app, express){
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use((req, res, next) => {
            res.locals.currentUser = req.user;       
            next();
        })
    }
}