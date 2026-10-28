const token = localStorage.getItem('token')

// Proteção da rota privada: se não houver token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = Number(document.getElementById('id').value)

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código do Motorista!</p>'
        return
    }

    fetch(`http://localhost:3000/motorista/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(async res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                return
            }

            const dados = await res.json()

            if (!res.ok) {
                resposta.innerHTML = `<p>${dados.message}</p>`
                return
            }

            resposta.innerHTML = `
                <table>
                    ${criarThead()}
                    ${criarTbody([dados], id)}
                </table>
            `
        })
        .catch(err => {
            console.error('Erro ao consultar motorista:', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados, id) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codMotorista || id}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.CNH}</td>`
        corpo += `<td>${el.CPF}</td>`
        corpo += `<td>${el.telefone}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CNH</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>
        </thead>
    `
}
