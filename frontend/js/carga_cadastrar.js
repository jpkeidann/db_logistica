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
        descricao: document.getElementById('descricao').value,
        peso: document.getElementById('peso').value,
        volume: document.getElementById('volume').value,
        codRastreio: Number(document.getElementById('codRastreio').value),
        idMotorista: Number(document.getElementById('idMotorista').value)
    }

    fetch('http://localhost:3000/carga', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(async res => {
            // só 401/403 significam sessão expirada; 404/422/500 são erros normais da operação
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
            console.error('Erro ao cadastrar carga:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
