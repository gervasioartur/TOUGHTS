const { DataTypes } = require('sequelize')
const db = require('../database/conn')

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = User