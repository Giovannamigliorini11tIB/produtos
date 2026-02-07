async function carregar() {
    try {
        const res = await fetch('http://localhost:8081/produtos')
        const dados = await res.json()
        const lista = document.getElementById('lista')

        dados.forEach(item => {
            const li = document.createElement('li')
            
            const nomeDiv = document.createElement('div')
            nomeDiv.className = 'item-nome'
            nomeDiv.textContent = item.nome

            const precoDiv = document.createElement('div')
            precoDiv.className = 'item-preco'
            precoDiv.textContent = 'R$ ' + parseFloat(item.preco).toFixed(2)

            li.appendChild(nomeDiv)
            li.appendChild(precoDiv)
            lista.appendChild(li)
        })
    } catch (error) {
        console.error('Erro ao carregar lista', error)
    }
}
carregar()