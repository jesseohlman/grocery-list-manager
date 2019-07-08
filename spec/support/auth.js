module.exports = {
    fakeIt(app){
        let name, email, id;

        middleware = (req, res, next) => {

                name = req.body.name || name;
                email = req.body.email || email;
                id = req.body.userId || id;

                if(id && id !== 0){
                    req.user = {
                        "name": name,
                        "email": email,
                        "id": id,

                    }
                } else if(id === 0) {
                    delete req.user;
                }

                if(next){next()}
        }

        function route(req, res){
            res.end();
        }

        app.use(middleware)
        app.get("/auth/fake", route);
    }
}