const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").user;

describe("User", () => {

    beforeEach((done) => {

      sequelize.sync({force: true})
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  
    });
  
    describe("#create()", () => {
  
      it("should create a new user", (done) => {
        User.create({
            name: "bill",
            email: "user@example.com",
            password: "1234567890"
        })
        .then((user) => {
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  
    });
  
  });