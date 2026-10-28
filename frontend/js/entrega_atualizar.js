const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código da Entrega!</p>'
        return
    }

    const campos = {
        cidadeDestino: document.getElementById('cidadeDestino').value.trim(),
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: document.getElementById('idCarga').value
    }

    // envia só o que foi preenchido, para não gravar vazio/0 nos outros campos
    const valores = {}
    for (const chave in campos) {
        if (campos[chave] !== '') {
            valores[chave] = campos[chave]
        }
    }
    if (valores.idCarga) {
        valores.idCarga = Number(valores.idCarga)
    }

    if (Object.keys(valores).length === 0) {
        resposta.innerHTML = '<p>Preencha ao menos um campo para atualizar!</p>'
        return
    }

    fetch(`http://localhost:3000/entrega/${id}`, {
        method: 'PUT',
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
            console.error('Erro ao atualizar entrega:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
