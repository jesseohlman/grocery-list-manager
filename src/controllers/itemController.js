const item = require("../db/models").item;
const list = require("../db/models").list;


const Auth = require("../policies/policy");

module.exports = {
    addItem(req, res, next){

        list.findOne({where: {id: req.params.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                item.create({
                    name: req.body.name,
                    count: req.body.count,
                    listId: req.params.listId
                })
                .then((item) => {
                    res.json(item);
                })
            } else {
                console.log("You are not athorized to do that.");
                res.redirect("/");
            }
        })
    },

    deleteItem(req, res, next){
        list.findOne({where: {id: req.params.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                item.destroy({where: {id: req.body.itemId, listId: req.params.listId}})
                .then((item) => {
                    res.json(item);
                    
                    console.log("an Item has been removed from the list");
                })
                .catch((err) => {
                    console.log(err);
                })
            } else {
                console.log("You are not athorized to do that.");
                res.redirect("/");
            }
        })
    },

    complete(req, res, next){

        list.findOne({where: {id: req.params.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                item.findOne({where: {id: req.body.itemId, listId: req.body.listId}})
                .then((item) => {
                    var change = false;
                    item.isAquired === false ? change = true : change = false;

                    item.update({isAquired: change})
                    .then((item) => {
                        res.json(item);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    
                })
            
            } else {
                console.log("You are not athorized to do that.");
                res.redirect("/");
            }
        })
    },

    update(req, res, next){
        console.log(`itemId: ${req.body.itemId} listId: ${req.params.listId} name: ${req.body.name} count: ${req.body.count}`);
        item.update({name: req.body.name, count: req.body.count},
            {where: {id: req.body.itemId, listId: req.params.listId}
        })
        .then((result) => {
            item.findOne({where: {id: req.body.itemId, listId: req.params.listId}})
            .then((item) => {
                console.log(`item.name; ${item.name}`)
                res.json(item)

            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}