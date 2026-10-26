const { Sequelize } = require("sequelize")

const db = new Sequelize('db_logistica', 'root' , 'senai',{
    port: 3306,
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = db