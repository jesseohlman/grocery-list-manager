const express  = require("express");
const app = express();
const routeConfig = require("./src/config/route-config");
//const mainConfig = require("./src/config/main-config");

routeConfig.init(app);


module.exports = app;