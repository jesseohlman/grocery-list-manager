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
        item.findAll({where: {listId: req.params.id}})
        .then((items) => {
            if(items){
                res.json(items);
            } else {
                res.json({name: "no Items have been added to this list", count: 0})
            }

        })
    },

    complete(req, res, next){
        list.findOne({where: {id: req.body.listId}})
        .then((list) => {
            var change = list.isCompleted === false ?  true : false;

            list.update({isCompleted: change})
            .then((list) => {
                res.json(list);
            })
            
        })
    },

    delete(req, res, next){
        list.destroy({where: {id: req.body.listId}})
        .then((list) => {
            res.json(list);
            console.log("a list has been deleted.");
        })
        .catch((err) => {
            console.log(err);
        })
    }
}