const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Voyage = require('./voyageModel');
db.Day = require('./dayModel');
db.User = require('./userModel');

db.Day.belongsTo( db.Voyage, {foreignKey: "voyage_id"} );
db.Voyage.hasMany(db.Day, { foreignKey: "voyage_id" });
db.Voyage.belongsTo (db.User, {foreignKey: "user_id"});
db.User.hasMany(db.Voyage, { foreignKey:"user_id"});

module.exports = db