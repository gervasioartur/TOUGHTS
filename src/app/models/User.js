const { Sequelize, DataTypes } = require('sequelize')
const database = require('../../config/database')
const sequelize = new Sequelize(database)

const User = sequelize.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
module.exports = User