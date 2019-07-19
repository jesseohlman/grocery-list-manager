const Item = require("../db/models").item;
const List = require("../db/models").list;

const Auth = require("../policies/policy");

module.exports = {
    addItem(req, res, next){
        List.findOne({where: {id: req.params.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                Item.create({
                    name: req.body.name,
                    count: req.body.count,
                    listId: req.params.listId,
                    isAquired: req.body.isAquired || false
                })
                .then((item) => {
                    res.end();
                })
            } else {
                res.json({message: "You are not Authorized to do that"});
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    },

    deleteItem(req, res, next){
        List.findOne({where: {id: req.params.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                Item.destroy({where: {id: req.body.itemId, listId: req.params.listId}})
                .then((item) => {
                    res.end();
                })
            } else {
                res.json({message:"You are not Authorized to do that"});
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    },

    complete(req, res, next){
        List.findOne({where: {id: req.body.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                Item.findOne({where: {id: req.body.itemId, listId: req.body.listId}})
                .then((item) => {
                    var change = item.isAquired === false ? true : false;
                    //change from true to false and vise versa
                    item.update({isAquired: change})
                    .then((item) => {
                        console.log(change);
                        res.json({isAquired: change});
                    })
                })
            } else {
                res.json({message:"You are not Authorized to do that"});
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    }
}