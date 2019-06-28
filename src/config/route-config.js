module.exports = {
    init(app){
        const itemsRoutes = require("../routes/items");
        const listRoutes = require("../routes/lists");

        app.use(listRoutes);
        app.use(itemsRoutes);
    }
}