const list = require("../db/models").list;

module.exports = {
    new(req, res, next){
        list.create({
            title: req.body.title,
            store: req.body.store,
            userId: req.user.id
        })
        .then((list) => {
            console.log(`list title: ${list.title}`)
        })
        .catch((err) => {
            console.log(err);
        })
    }
}