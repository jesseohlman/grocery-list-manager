module.exports = {
    init(app){
        const itemsRoutes = require("../routes/items");

        app.use(itemsRoutes);
    }
}