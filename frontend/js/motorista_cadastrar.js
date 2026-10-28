const token = localStorage.getItem('token')

// Proteção da rota privada: se não houver token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

function sessaoExpirada() {
    localStorage.clear()
    alert('Faça login novamente, tempo expirado!')
    location.href = '../index.html'
}

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    // o backend espera CNH e CPF em maiúsculo
    const valores = {
        nome: document.getElementById('nome').value,
        CNH: document.getElementById('cnh').value,
        CPF: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch('http://localhost:3000/motorista', {
        method: 'POST',
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
            console.error('Erro ao cadastrar motorista:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
