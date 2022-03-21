const { Sequelize, DataTypes } = require('sequelize')
const database = require('../../config/database')
const sequelize = new Sequelize(database)
const User = require('./User')

const Tought = sequelize.define('tought', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
Tought.belongsTo(User, {
    constraints: true
})
User.hasMany(Tought)

module.exports = Tought