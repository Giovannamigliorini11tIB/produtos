document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro')

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const nomeInput = document.getElementById('nome')
            const precoInput = document.getElementById('preco')

            try {
                const response = await fetch('http://localhost:8081/produtos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome: nomeInput.value, 
                        preco: precoInput.value 
                    })
                })

                if (!response.ok) throw new Error('Erro na API')
                
                alert('Salvo com sucesso!')
                form.reset()

            } catch (error) {
                console.error(error)
                alert('Erro ao conectar com o servidor.')
            }
        })
    }
})