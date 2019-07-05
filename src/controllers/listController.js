const list = require("../db/models").list;
const item = require("../db/models").item;

const Auth = require("../policies/policy");


module.exports = {
    new(req, res, next){

        var auth = new Auth(req.user);

        if(auth._isSignedIn()){
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
        } else {
            console.log("You are not authorized to do that.");
            res.redirect("/");
        }
    },

    select(req, res, next){

        list.findAll({where: {userId: req.user.id, isCompleted: false}})
        .then((lists) => {
            var notComplete = lists;
            
            list.findAll({where: {userId: req.user.id, isCompleted: true}})
            .then((lists) => {
                var allLists;
                if(lists){
                    allLists = notComplete.concat(lists);
                } else {
                    allLists = notComplete;
                }

                if(allLists){
                    res.json(allLists);
                } else {
                    res.json({title: "no lists created", store: ""})
                }
            })
            
        })
        .catch((err) => {
            console.log(err);
        })
    },

    view(req, res, next){

        item.findAll({where: {listId: req.params.id, isAquired: false}})
        .then((items) => {
            var notGot = items;

            item.findAll({where: {listId: req.params.id, isAquired: true}})
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
                    res.json({name: "no Items have been added to this list", count: 0})
                }
            })
        })
    },

    complete(req, res, next){

        var auth = new Auth(req.user);

        if(auth._isOwner()){
            list.findOne({where: {id: req.body.listId}})
            .then((list) => {
                var change = list.isCompleted === false ?  true : false;

                list.update({isCompleted: change})
                .then((list) => {
                    res.json(list);
                })
                
            })
        } else {
            console.log("You are not authorized to do that.");
            res.redirect("/");
        }
    },

    delete(req, res, next){

        var auth = new Auth(req.user);

        if(auth._isOwner()){
            list.destroy({where: {id: req.body.listId}})
            .then((list) => {
                res.json(list);
                console.log("a list has been deleted.");
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            console.log("You are not authorized to do that.");
            res.redirect("/");
        }
    }
    
}