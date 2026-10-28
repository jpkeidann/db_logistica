const token = localStorage.getItem('token')

// Proteção da rota privada: se não houver token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        cidadeDestino: document.getElementById('cidadeDestino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: Number(document.getElementById('idCarga').value)
    }

    fetch('http://localhost:3000/entrega', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(async res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                return
            }

            const dados = await res.json()
            resposta.innerHTML = `<p>${dados.message}</p>`
            if (res.ok) {
                document.querySelector('form').reset()
            }
        })
        .catch(err => {
            console.error('Erro ao cadastrar entrega:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
