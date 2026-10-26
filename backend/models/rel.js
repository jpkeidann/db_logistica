const Carga = require("./Carga");
const Entrega = require("./Entrega");
const Motorista = require("./Motorista");

Motorista.hasMany(Carga,{
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista,{
    foreignKey: 'idMotorista',
    as: 'cargaMotorista',
    allowNull: false
})

Carga.hasMany(Entrega,{
    foreignKey: 'idCarga',
    as: 'cargaEntrega',
    allowNull: false
})

Entrega.belongsTo(Carga,{
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    onDelete: 'CASCADE'
})

module.exports = { Carga , Motorista , Entrega }