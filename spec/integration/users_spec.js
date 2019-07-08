const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const ServerBase = "http://localhost:5000";
const ClientBase = "http://localhost:3000";

const server = require("../../server");

const user = require("../../src/db/models").user;
const axios = require("axios");


describe("users: routes", () => {
    beforeEach((done) => {
        this.user;

        sequelize.sync({force: true})
        .then((res) => {
            user.create({
                name: "Toby",
                email: "123@gmail.com",
                password: "1234567890"
            })
            .then((user) => {
                this.user = user;
                done();
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    /*describe("GET /users/signIn/", () => {
        it("should render the sign in page", (done) => {
            request.get(`${base}/users/signIn`, (err, res, body) => {
                expect(body).toContain("name:");
                done();
            })
            
        })
    })*/

    

    describe("POST /users/submit", () => {
        it("should create a new user", (done) => {

                axios.post(`${ServerBase}/users/submit`, {
                    name: "Jim",
                    email: "jim@gmail.com",
                    password: "1234567890"
                }).then((res) => {
                    user.findOne({where: {name: "Jim"}})
                    
                    .then((user) => {
                        expect(user).not.toBeNull();
                        expect(user.email).toBe("jim@gmail.com");
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