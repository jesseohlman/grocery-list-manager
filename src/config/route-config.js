module.exports = {
    init(app){
        const itemsRoutes = require("../routes/items");
        const listRoutes = require("../routes/lists");
        const userRoutes = require("../routes/users");

        app.use(userRoutes);
        app.use(listRoutes);
        app.use(itemsRoutes);
    }
}