const list = require("../db/models").list;
const item = require("../db/models").item;


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
    },

    select(req, res, next){
        list.findAll({where: {userId: req.user.id}})
        .then((lists) => {
            if(lists){
                res.json(lists);
            } else {
                res.json({title: "no lists created", store: ""})
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },

    view(req, res, next){
        console.log(`params.id: ${req.params.id}`)
        item.findAll({where: {listId: req.params.id}})
        .then((items) => {
            res.json(items);

        })
    }
}