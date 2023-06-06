const Sequelize = require('sequelize')
const db = require('../db.js')

const Day = db.define('day', {
    day_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
    specifiedTime: { type: Sequelize.DATE, allowNull: false },
    specifiedLocation: { type: Sequelize.STRING, allowNull: false },
    voyage_id: { type: Sequelize.INTEGER, allowNull: false }
})

module.exports = Day