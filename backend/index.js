const express = require('express')
const cors = require('cors')
const app = express()

const conn = require('./db/conn')

const host = 'localhost'
const PORT = 3000

require('./models/rel')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const motoristaController = require('./controller/motorista.controller')
const funcionarioController = require('./controller/funcionario.controller')
const authController = require('./controller/auth.controller')

const authMiddleware = require('./middleware/auth.middleware')

// ------------- midware -------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// ------------ Rotas Públicas --------------

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res) => {
    return res.status(200).json({message: 'Aplicação rodando yipeeee!!'})
})

// ----------- Rotas Privadas -------------

app.use(authMiddleware)

app.get('/funcionarios', funcionarioController.listar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.put('/entrega/:id', entregaController.atualizar)

app.post('/carga', cargaController.cadastrar)
app.get('/cargas', cargaController.listar)

app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:id', motoristaController.consultar)
app.get('/motorista/nome/:nome', motoristaController.consultarNome)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

// ---------- server -------------
conn.sync()
.then(()=>{
    app.listen(PORT,host ,()=>{
        console.log(`Servidor rodando em: http://${host}:${PORT}/`)
    })
})
.catch((err)=>{
    console.error('Houve um problema com o banco de dados: ', err)
})