const Funcionario = require('../models/Funcionario')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

const cadastrar = async (req,res) =>{
    const valores = req.body

    try {
        if(!valores.nome || !valores.email || !valores.senha){
            return res.status(422).json({message: 'Preencha todos os campos!'})
        }

        const senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString();

        const valores2 = {
            nome: valores.nome,
            email: valores.email,
            senha: senha
        }

        await Funcionario.create(valores2)
        return res.status(201).json({message: 'Funcionário cadastrado com sucesso!'})
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao cadastrar o funcionário!'})
    }
}

const listar = async (req,res) =>{
    try {
        const dados = await Funcionario.findAll()
        const resultado = []
        dados.forEach(el => {
            resultado.push({
                codFuncionario: el.codFuncionario,
                nome: el.nome,
                email: el.email,
            })
        });
        return res.status(201).json(resultado)
    } catch (err) {
        return res.status(500).json({message: 'ocorreu um problema ao listar o funcionário!'})
    }
}

module.exports = { cadastrar , listar }