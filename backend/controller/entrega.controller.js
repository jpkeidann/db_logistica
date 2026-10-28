const Carga = require('../models/Carga')
const Entrega = require('../models/Entrega')

const cadastrar = async (req,res) =>{
    const valores = req.body

    try {
        if(!valores.cidadeDestino || !valores.status || !valores.data || !valores.hora || !valores.idCarga){
            return res.status(422).json({message: 'Preencha todos os campos!'})
        }
        
        const carga = await Carga.findByPk(valores.idCarga)
        
        if(!carga){
            return res.status(404).json({message: 'Não foi possível encontrar a carga!'})
        }

        await Entrega.create(valores)
        return res.status(201).json({message: 'Entrega cadastrada com sucesso!'})
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar a Entrega!'})
    }
}

const listar = async (req,res) =>{
    try {
        const dados = await Entrega.findAll()
        return res.status(201).json(dados)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao Listar a Entrega!'})
    }
}

const atualizar = async (req,res) =>{
    const id = req.params.id
    const valores = req.body
    try {
        const entrega = await Entrega.findByPk(id)
        if(!entrega){
            return res.status(422).json({message: 'A Entrega não foi encontrada!'})
        }

        if(valores.idCarga){
            const carga = await Carga.findByPk(valores.idCarga)
            
            if(!carga){
                return res.status(404).json({message: 'Não foi possível encontrar a carga!'})
            }
        }

        await Entrega.update(valores,{where: {codEntrega: id}})
        return res.status(201).json({message: 'Entrega atualizada com sucesso!'})
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao atualizar a Entrega!'})
    }
}


module.exports = { cadastrar , listar , atualizar }