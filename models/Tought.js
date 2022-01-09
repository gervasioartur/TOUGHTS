const { DataTypes } = require('sequelize')
const db = require('../database/conn')
const User = require('./User')

const Tought = db.define('toughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought