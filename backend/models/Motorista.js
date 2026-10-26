const { DataTypes } = require('sequelize')
const db = require("../db/conn")

const Motorista = db.define('motorista',{
    codMotorista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    CNH: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
},{
    timestamps: false , 
    tableName: 'motoristas'
})

module.exports = Motorista