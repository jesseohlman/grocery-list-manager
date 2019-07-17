const List = require("../db/models").list;
const Item = require("../db/models").item;

const Auth = require("../policies/policy");

module.exports = {
    new(req, res, next){

        var auth = new Auth(req.user);

        if(auth._isSignedIn()){
            List.create({
                title: req.body.title,
                store: req.body.store,
                userId: req.user.id,
                id: req.body.id
            })
            .then((list) => {
                res.end();
            })
            .catch((err) => {
                console.log(err);
                res.end();
            })
        } else {
            res.json({message: "You are not authorized to do that."});
        }
    },

    select(req, res, next){
        List.findAll({where: {userId: req.user.id, isCompleted: false}})
        .then((lists) => {
            var notComplete = lists;
            
            List.findAll({where: {userId: req.user.id, isCompleted: true}})
            .then((lists) => {
                var allLists;
                if(lists){
                    allLists = notComplete.concat(lists);
                } else {
                    allLists = notComplete;
                }

                res.json(allLists);
            })
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    },

    view(req, res, next){
        Item.findAll({where: {listId: req.params.id, isAquired: false}})
        .then((items) => {
            var notGot = items;

            Item.findAll({where: {listId: req.params.id, isAquired: true}})
            .then((items) => {
                var list;
                if(items){
                    list = notGot.concat(items)
                } else {
                    list = notGot;
                }
            
                if(list){
                    res.json(list);
                } else {
                    res.end();
                }
            })
        })
    },

    complete(req, res, next){
        List.findOne({where: {id: req.body.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                var change = list.isCompleted === false ?  true : false;

                list.update({isCompleted: change})
                .then((list) => {
                    res.json(list);
                })
            } else {
                res.json({message: "You are not authorized to do that."})
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
       
    },

    delete(req, res, next){
        List.findOne({where: {id: req.body.listId}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){
                list.destroy({})
                .then((list) => {
                    res.json(list);
                })
            } else {
                res.json({message: "You are not authorized to do that."});
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    },

    update(req, res, nex){
        List.findOne({where: {id: req.body.id}})
        .then((list) => {

            var auth = new Auth(req.user, list);

            if(auth._isOwner()){

            List.update({title: req.body.title, store: req.body.store}, 
                {where: {id: req.body.id}})
                .then((list) => {
                    List.findOne({where: {id: req.body.id}})
                    .then((list) => {
                        res.json(list)
                    })
                })
            } else {
                res.json({message: "You are not authorized to do that."});
            }
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    }


    
}