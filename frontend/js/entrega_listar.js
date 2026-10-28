const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/entregas', {
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
            <table border="1">
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
        })
        .catch((err) => {
            console.error('Erro ao listar os dados', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codEntrega}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.idCarga}</td>`
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
                <th>Cidade/Destino</th>
                <th>Status</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Código Carga</th>
            </tr>
        </thead>
    `
}
