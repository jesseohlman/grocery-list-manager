const item = require("../db/models").item;

module.exports = {
    new(req, res, next){
        item.create({
            name: req.body.name,
            count: req.body.count,
            listId: req.params.listId
        })
    }
}