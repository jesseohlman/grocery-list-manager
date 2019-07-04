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

    },

    deleteItem(req, res, next){
        item.destroy({where: {id: req.body.itemId, listId: req.params.listId}})
        .then((item) => {
            res.json(item);
            console.log("an Item has been removed from the list");
        })
        .catch((err) => {
            console.log(err);
        })
    },

    complete(req, res, next){
        item.findOne({where: {id: req.body.itemId, listId: req.body.listId}})
        .then((item) => {
            var change = false;
            item.isAquired === false ? change = true : change = false;

            item.update({isAquired: change})
            .then((item) => {
                res.json(item);
            })
            
        })
    }
}