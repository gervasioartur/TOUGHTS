const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conecatado com sucesso!')
} catch (err) {
    console.log('Não foi possível conectar ' + err)
}

module.exports = sequelize