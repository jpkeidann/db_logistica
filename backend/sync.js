const { Carga , Motorista , Entrega} = require('./models/rel')
const Funcionario = require("./models/Funcionario") 
const conn = require('./db/conn')

async function sync() {
    try {
        await conn.sync({force: true})
        console.log('fazendo a conexão com o banco')
    } catch (err) {
        console.error('ocorreu um problema ao sincronizar o banco!',err)
    }finally{
        console.log('fechando a conexão com o banco...')
        await conn.close()
    }
}

sync()