const Item = require("../../src/db/models").item;
const List = require("../../src/db/models").list;
const User = require("../../src/db/models").user;
const sequelize = require("../../src/db/models/index").sequelize;

describe("item", () => {

    beforeEach((done) => {
        this.list;
        this.item;
        this.user;

        sequelize.sync({force: true})
        .then((res) => {

            User.create({
                name: "bob",
                email: "email@gmail.com",
                password: "1234567890"
            })
            .then((user) => {
                this.user = user;
                List.create({
                    title: "list5",
                    store: "costco",
                    userId: this.user.id
                }).then((list) => {
                    this.list = list;
                        
                    Item.create({
                        name: "Big item",
                        count: "meijer",
                        listId: this.user.id
                    })
                    .then((item) => {
                        this.item = item;

                        done();
                    });
                })
            })
            .catch((err) => {
                console.log(err);
                done();
              })
            })
        });

    describe("#create()", () => {

        it("should create a new item and store it", (done) => {
            Item.create({
                name: "Bigger item",
                count: "costco",
                listId: this.list.id
            })
            .then((item) => {
                expect(item.name).toBe("Bigger item");
                expect(item.count).toBe("costco");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

});