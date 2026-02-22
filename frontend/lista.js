async function carregar() {
    try {
        const res = await fetch('http://localhost:8081/produtos')
        const dados = await res.json()
        const lista = document.getElementById('lista')

        lista.innerHTML = ''

        dados.forEach(item => {
            const li = document.createElement('li')
            
            const nomeDiv = document.createElement('div')
            nomeDiv.className = 'item-nome'
            nomeDiv.textContent = item.nome

            const precoDiv = document.createElement('div')
            precoDiv.className = 'item-preco'
            precoDiv.textContent = 'R$ ' + parseFloat(item.preco).toFixed(2)

            const btnApagar = document.createElement('button')
            btnApagar.className = 'btn-apagar'
            btnApagar.title = 'Apagar produto'
            
            btnApagar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `
            
            btnApagar.addEventListener('click', async () => {
                const confirmacao = confirm(`Deseja realmente apagar o item: ${item.nome}?`)
                
                if (confirmacao) {
                    try {
                        const resposta = await fetch(`http://localhost:8081/produtos/${item.id}`, {
                            method: 'DELETE'
                        })

                        if (resposta.ok) {
                            alert('Informação apagada com sucesso!')
                            carregar()
                        } else {
                            alert('Erro ao apagar o produto no servidor.')
                        }
                    } catch (erro) {
                        console.error('Erro na requisição:', erro)
                        alert('Falha de conexão ao tentar apagar.')
                    }
                }
            })

            li.appendChild(nomeDiv)
            li.appendChild(precoDiv)
            li.appendChild(btnApagar)
            lista.appendChild(li)
        })
    } catch (error) {
        console.error('Erro ao carregar lista', error)
    }
}

carregar()