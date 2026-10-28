const Motorista = require('../models/Motorista')
const Carga = require('../models/Carga')

const cadastrar = async (req,res) =>{
    const valores = req.body

    try {
        if(!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio || !valores.idMotorista){
            return res.status(422).json({message: 'Preencha todos os campos!'})
        }
        
        const motorista = await Motorista.findByPk(valores.idMotorista)
        
        if(!motorista){
            return res.status(404).json({message: 'Não foi possível encontrar o motorista!'})
        }

        await Carga.create(valores)
        return res.status(201).json({message: 'Carga cadastrada com sucesso!'})
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar a Carga!'})
    }
}

const listar = async (req,res) =>{
    try {
        const dados = await Carga.findAll()
        return res.status(201).json(dados)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao Listar a Carga!'})
    }
}

module.exports = { cadastrar , listar }