const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    lastname: { type: Sequelize.STRING, allowNull: false },
    firstname: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
})

module.exports = User