const { Sequelize } = require("sequelize")

const db = new Sequelize('db_logistica', 'joaoPedro' , 'Batatamaunu1253*',{
    port: 3306,
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = db