const item = require("../db/models").item;

module.exports = {
    addItem(req, res, next){
        item.create({
            name: req.body.name,
            count: req.body.count,
            listId: req.body.listId
        })
        .then((item) => {
            res.json(item);
        })

    }
}