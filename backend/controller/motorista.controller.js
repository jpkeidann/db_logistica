const Motorista = require('../models/Motorista')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

const cadastrar = async (req,res) =>{
    const valores = req.body

    try {
        if(!valores.nome || !valores.CNH || !valores.CPF || !valores.telefone){
            return res.status(422).json({message: 'Preencha todos os campos!'})
        }

        const CNH = CryptoJS.AES.encrypt(valores.CNH, CHAVE_SECRETA).toString();
        const CPF = CryptoJS.AES.encrypt(valores.CPF, CHAVE_SECRETA).toString();

        const valores2 = {
            nome: valores.nome,
            CNH: CNH,
            CPF: CPF,
            telefone: valores.telefone
        }

        await Motorista.create(valores2)
        return res.status(201).json({message: 'Motorista cadastrado com sucesso!'})
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar o Motorista!'})
    }
}

const listar = async (req,res) =>{
    try {
        const dados = await Motorista.findAll()
        const resultado = []
        dados.forEach(el => {
            const bytes  = CryptoJS.AES.decrypt(el.CNH, CHAVE_SECRETA);
            const CNH = bytes.toString(CryptoJS.enc.Utf8);
            const bytes2  = CryptoJS.AES.decrypt(el.CPF, CHAVE_SECRETA);
            const CPF = bytes2.toString(CryptoJS.enc.Utf8);
            resultado.push({
                nome: el.nome,
                CNH: CNH,
                CPF: CPF,
                telefone: el.telefone
            })
        });
        return res.status(201).json(resultado)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar o funcionário!'})
    }
}

const consultar = async (req,res) =>{
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if(!Motorista){
            return res.status(422).json({message: 'O motorista não foi encontrado!'})
        }

        const bytes  = CryptoJS.AES.decrypt(motorista.CNH, CHAVE_SECRETA);
        const CNH = bytes.toString(CryptoJS.enc.Utf8);
        const bytes2  = CryptoJS.AES.decrypt(motorista.CPF, CHAVE_SECRETA);
        const CPF = bytes2.toString(CryptoJS.enc.Utf8);

        const payload = {
            nome: motorista.nome,
            CNH: CNH,
            CPF: CPF,
            telefone: motorista.telefone
        }
        return res.status(201).json(payload)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar o funcionário!'})
    }
}

const consultarNome = async (req,res) =>{
    const nome = req.params.nome
    try {
        const motorista = await Motorista.findOne({where: {nome: nome}})
        if(!Motorista){
            return res.status(422).json({message: 'O motorista não foi encontrado!'})
        }

        const bytes  = CryptoJS.AES.decrypt(motorista.CNH, CHAVE_SECRETA);
        const CNH = bytes.toString(CryptoJS.enc.Utf8);
        const bytes2  = CryptoJS.AES.decrypt(motorista.CPF, CHAVE_SECRETA);
        const CPF = bytes2.toString(CryptoJS.enc.Utf8);

        const payload = {
            nome: motorista.nome,
            CNH: CNH,
            CPF: CPF,
            telefone: motorista.telefone
        }
        return res.status(201).json(payload)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar o funcionário!'})
    }
}

module.exports = { cadastrar , listar , consultar , consultarNome }