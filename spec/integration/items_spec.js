const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const ServerBase = "http://localhost:5000";
const ClientBase = "http://localhost:3000";

const server = require("../../server");

const Item = require("../../src/db/models").item;
const List = require("../../src/db/models").list;
const User = require("../../src/db/models").user;
const axios = require("axios");


describe("routes : items", () => {

    beforeEach((done) => {
        this.user;
        this.list;
        this.item;

        sequelize.sync({force: true})
        .then((res) => {
            User.create({
                name: "Toby",
                email: "123@gmail.com",
                password: "1234567890"
            })
            .then((user) => {
                this.user = user;
                
                List.create({
                    title: "New List",
                    store: "Publics",
                    userId: this.user.id

                })
                .then((list) => {
                    this.list = list;
                    Item.create({
                        name: "new item",
                        count: "8",
                        listId: this.list.id
                    })
                    .then((item) => {
                        this.item = item;
                    
                    
                        request.get({
                            url: "http://localhost:5000/auth/fake",
                            form: {
                            name: this.user.name,
                            userId: this.user.id,
                            email: this.user.email
                            }
                        },
                        (err, res, body) => {
                            done();
                        }) 
                    })
                })
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    });

    describe("POST /lists/:listId/addItem", () => {
        it("should add a new item to the list", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/addItem`, {
                name: "turkey",
                count: "4",
                listId: this.list.id
              })
              .then((res) => {
                  Item.findOne({where: {name: "turkey"}})
                  .then((item) => {
                      expect(item.count).toBe("4");
                      expect(item.listId).toBe(this.list.id);
                      done();
                  })
              })
              .catch((err) => {
                  console.log(err);
                  done();
              })
        })
    });

    describe("POST /lists/:listId/deleteItem", () => {
        it("should delete the specified item", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/deleteItem`, {
                itemId: this.item.id
              })
              .then((res) => {
                  Item.findOne({where: {id: this.item.id}})
                  .then((item) => {
                      expect(item).toBeNull();
                      done();
                  })
              })
              .catch((err) => {
                  console.log(err);
                  done();
              })
        })
    });


    describe("POST /lists/:listId/completeItem", () => {
        it("should change the item from aquired to not and vise versa", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/completeItem`, {
                itemId: this.item.id,
                listId: this.list.id
              })
              .then((res) => {
                  Item.findOne({where: {id: this.item.id}})
                  .then((item) => {
                      expect(item.isAquired).toBe(true);
                       
                      axios.post(`${ServerBase}/lists/${this.list.id}/completeItem`, {
                        itemId: this.item.id,
                        listId: this.list.id
                      })
                      .then((res) => {
                          Item.findOne({where: {id: this.item.id}})
                          .then((item) => {
                              expect(item.isAquired).toBe(false);
                              done();
                          })
                      })
                  })
              })
              .catch((err) => {
                  console.log(err);
                  done();
              })
        })
    });

    describe("POST /lists/:listId/updateItem", () => {
        it("should update the item with the given info", () => {
            axios.post(`${ServerBase}/lists/${this.list.id}/updateItem`, {
                itemId: this.item.id,
                name: "NEW NAME",
                count: "NEW COUNT"
              })
              .then((res) => {
                  Item.findOne({where: {id: this.item.id}})
                  .then((item) => {
                      expect(item.name).toBe("NEW NAME");
                      expect(item.count).toBe("NEW COUNT");
                      expect(item.isAquired).toBe(false);
                      done();
                  })
              })
              .catch((err) => {
                console.log(err);
                done();
            })
        })
              
    })
})