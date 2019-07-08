const List = require("../../src/db/models").list;
const User = require("../../src/db/models").user;
const sequelize = require("../../src/db/models/index").sequelize;

describe("list", () => {

    beforeEach((done) => {

        this.list;
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
                title: "Big list",
                store: "meijer",
                userId: this.user.id
            })
                .then((list) => {
                    this.list = list;

                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
              })
            })
        });

    describe("#create()", () => {

        it("should create a new list and store it", (done) => {
            List.create({
                title: "Bigger list",
                store: "costco",
                userId: this.user.id
            })
            .then((list) => {
                expect(list.title).toBe("Bigger list");
                expect(list.store).toBe("costco");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

});
