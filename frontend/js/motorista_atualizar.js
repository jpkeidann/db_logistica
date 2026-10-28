const token = localStorage.getItem('token')

// Proteção da rota privada: se não houver token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

function sessaoExpirada() {
    localStorage.clear()
    alert('Faça login novamente, tempo expirado!')
    location.href = '../index.html'
}

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código do Motorista!</p>'
        return
    }

    // o backend espera CNH e CPF em maiúsculo
    const campos = {
        nome: document.getElementById('nome').value.trim(),
        CNH: document.getElementById('cnh').value.trim(),
        CPF: document.getElementById('cpf').value.trim(),
        telefone: document.getElementById('telefone').value.trim()
    }

    // envia só o que foi preenchido, para não apagar os outros campos
    const valores = {}
    for (const chave in campos) {
        if (campos[chave] !== '') {
            valores[chave] = campos[chave]
        }
    }

    if (Object.keys(valores).length === 0) {
        resposta.innerHTML = '<p>Preencha ao menos um campo para atualizar!</p>'
        return
    }

    fetch(`http://localhost:3000/motorista/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(async res => {
            if (res.status === 401 || res.status === 403) {
                sessaoExpirada()
                return
            }
            const dados = await res.json()
            resposta.innerHTML = `<p>${dados.message}</p>`
            if (res.ok) {
                document.querySelector('form').reset()
            }
        })
        .catch(err => {
            console.error('Erro ao atualizar motorista:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
