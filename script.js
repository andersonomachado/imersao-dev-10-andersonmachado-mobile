document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('caixa-busca');
    const botaoBusca = document.getElementById('botao-busca');
    const botaoLimpar = document.getElementById('botao-limpar'); // Seleciona o botão de limpar existente
    const cardContainer = document.querySelector('.card-container');
    let madeiras = [];

    // Carrega os dados do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            madeiras = data;
            // exibirCards(madeiras); // Linha removida para não exibir cards inicialmente
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    // Adiciona a função de limpar ao botão
    botaoLimpar.addEventListener('click', () => {
        campoBusca.value = ''; // Limpa o campo de texto
        cardContainer.innerHTML = ''; // Limpa os resultados da busca
        campoBusca.focus(); // Coloca o foco de volta no campo de busca
    });

    // Função para normalizar strings (remover acentos e converter para minúsculas)
    function normalizarString(str) {
        if (!str) return '';
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Função para criar e exibir os cards
    function exibirCards(listaMadeiras) {
        cardContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards
        if (listaMadeiras.length === 0) {
            cardContainer.innerHTML = '<p>Nenhuma madeira encontrada.</p>';
            return;
        }

        listaMadeiras.forEach(madeira => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <h2>${madeira.nome_comercial}</h2>
                <p><strong>Nome Científico:</strong> ${madeira.nome_cientifico}</p>
                <p><strong>Origem:</strong> ${madeira.origem}</p>
                <p><strong>Árvore:</strong> ${madeira.arvore || 'Não disponível'}</p>
                <p><strong>Características Gerais:</strong> ${madeira.caracteristicas_gerais || 'Não disponível'}</p>
                <p><strong>Secagem em Estufa:</strong> ${madeira.secagem_em_estufa || 'Não disponível'}</p>
                <p><strong>Trabalhabilidade:</strong> ${madeira.trabalhabilidade || 'Não disponível'}</p>
                <a href="https://lpf.florestal.gov.br/pt-br/madeiras-brasileiras/" target="_blank" class="info-button">Mais Informações</a>
            `;
            cardContainer.appendChild(card);
        });
    }

    // Função para lidar com a busca
    function buscar() {
        const termoBusca = normalizarString(campoBusca.value.trim());
        if (termoBusca === '') {
            cardContainer.innerHTML = ''; // Limpa os resultados se a busca estiver vazia
            return;
        }
        const resultado = madeiras.filter(madeira => 
            normalizarString(madeira.nome_comercial).includes(termoBusca) ||
            normalizarString(madeira.nome_cientifico).includes(termoBusca) ||
            normalizarString(madeira.origem).includes(termoBusca)
        );
        exibirCards(resultado);
    }

    // A busca agora é acionada enquanto o usuário digita
    campoBusca.addEventListener('input', buscar);
});