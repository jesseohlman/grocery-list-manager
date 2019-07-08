module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const itemsRoutes = require("../routes/items");
        const listRoutes = require("../routes/lists");
        const userRoutes = require("../routes/users");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/support/auth.js");
            mockAuth.fakeIt(app);
        }

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(listRoutes);
        app.use(itemsRoutes);
    }
}