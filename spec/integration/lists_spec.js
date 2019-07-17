const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const ServerBase = "http://localhost:5000";
const ClientBase = "http://localhost:3000";

const server = require("../../server");

const Item = require("../../src/db/models").item;
const List = require("../../src/db/models").list;
const User = require("../../src/db/models").user;
const axios = require("axios");


describe("users: routes", () => {
    beforeEach((done) => {
        this.user;
        this.list;

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
        .catch((err) => {
            console.log(err);
            done();
        })
    });

    describe("POST /lists/create/", () => {
        it("should create a new list", (done) => {
            axios.post(`${ServerBase}/lists/create/`, {
                title: "list1",
                store: "store1"
            })
            .then((res) => {
                List.findOne({where: {store: "store1"}})
                .then((list) => {
                    expect(list).not.toBeNull();
                    expect(list.title).toBe("list1");
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

    describe("POST /lists/:id/complete", () => {
        it("should change the list to completed if not completed and vise versa", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/complete/`, {
                listId: this.list.id
              })
              .then((res) => {
                  List.findOne({where: {title: "New List"}})
                  .then((list) => {
                      expect(list.isCompleted).toBe(true);
                      
                      axios.post(`${ServerBase}/lists/${this.list.id}/complete/`, {
                        listId: this.list.id
                      })
                      .then((res) => {
                          List.findOne({where: {title: "New List"}})
                          .then((list) => {
                              expect(list.isCompleted).toBe(false);
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

    describe("POST /lists/:id/delete", () => {
        it("should delete the list", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/delete`, {
                listId: this.list.id
              })
              .then((res) => {
                  List.findOne({where: {id: this.list.id}})
                  .then((list) => {
                    expect(list).toBeNull();
                    done();
                  })
              })
              .catch((err) => {
                  console.log(err);
                  done();
              })
        })
    })

    describe("GET /lists/select/", () => {
        it("should get all of the lists attached to the user ordered by completed", (done) => {
            List.create({
                title: "COMPLETE",
                store: "costco",
                isCompleted: true,
                userId: this.user.id
            })
            .then((list) => {
                axios.get(`${ServerBase}/lists/select`)
                .then((res) => {
                    expect(res.data.length).toBe(2);
                    expect(res.data[0].title).toBe("New List");
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

    describe("GET /lists/:id/view/", () => {
        it("should get all of the items attached to the list ordered by completed", (done) => {
            Item.create({
                name: "item1",
                count: "3lb",
                listId: this.list.id,
                isAquired: true
            })
            .then((item) => {
                Item.create({
                    name: "item2",
                    count: "4lb",
                    listId: this.list.id
                })
                .then((item) => {
                    axios.get(`${ServerBase}/lists/${this.list.id}/view/`)
                    .then((res) => {
                        expect(res.data.length).toBe(2);
                        expect(res.data[0].name).toBe("item2");
                        done();
                    })
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        it("should not get items from other lists", (done) => {
            List.create({
                title: "new list",
                store: "costco",
                userId: this.user.id
            })
            .then((list) => {
                Item.create({
                    name: "item3",
                    count: "4lb",
                    listId: list.id
                })
                .then((item) => {
                    axios.get(`${ServerBase}/lists/${this.list.id}/view/`)
                    .then((res) => {
                        expect(res.data.length).toBe(0);
                        done();
                    })
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    });

    describe("POST /lists/:id/update", () => {
        it("should update the list with the given values", (done) => {
            axios.post(`${ServerBase}/lists/${this.list.id}/update/`, {
                title: "NEW TITLE",
                store: "PUBLICS",
                id: this.list.id
            })
            .then((res) => {
                List.findOne({where: {id: this.list.id}})
                .then((list) => {
                    expect(list.title).toBe("NEW TITLE");
                    expect(list.store).toBe("PUBLICS");
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

});