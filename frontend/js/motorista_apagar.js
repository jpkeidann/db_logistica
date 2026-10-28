const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código do Motorista!</p>'
        return
    }

    if (!confirm('Tem certeza que deseja excluir este Motorista?')) {
        return
    }

    fetch(`http://localhost:3000/motorista/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao apagar:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
