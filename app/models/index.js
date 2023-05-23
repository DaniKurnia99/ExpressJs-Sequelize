const Sequelize = require("sequelize");
const sequelizeConnect = new Sequelize(
    "biodata",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql"
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConnect = sequelizeConnect;

db.biodata = require("../models/biodata.model.js")(sequelizeConnect, Sequelize)

module.exports = db;