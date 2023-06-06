const Sequelize = require('sequelize')
const db = require('../db.js')

const Voyage = db.define('voyage', {
    voyage_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Voyage