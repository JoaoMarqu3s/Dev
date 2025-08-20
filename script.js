document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // DADOS (PROJETOS E LIVROS)
    // =================================================================
    const meusProjetos = [
        { imagem: 'assets/images/shocks.png', titulo: 'Gerador de Relatório', descricao: 'Esta página web foi desenvolvida com HTML, CSS e JS, com a finalidade de atender as necessidades da loja de iluminação Shocks.', descricaoDetalhada:'A solução permite que os funcionários vizualizem e selecionem os produtos necessarios para cada cliente, separando-os por ambiente, e, por fim, gerando um relatorio que pode ser impresso (Físico ou PDF). Acesse para vizualizar melhor a solução e as funcionalidades!', linkExterno: 'https://joaomarqu3s.github.io/Shocks/' },
        { imagem: 'assets/images/malumarques.png', titulo: 'Porfolio Nutricionista', descricao: 'Portfolio feito para a nutricionista Maria Luisa Marques.', descricaoDetalhada: 'Este Portfolio apresenta de forma interativa e chamativa os serviços realizados pela Nutricionista, atuando como um convite envolvente para os leads.', linkExterno: 'https://joaomarqu3s.github.io/malumarques/' },
        { imagem: 'assets/images/projeto3.jpg', titulo: 'Landing Page', descricao: 'Uma landing page moderna com animações e foco em conversão.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 3. Dê todos os detalhes que um recrutador gostaria de saber.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Portfólio Antigo', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Clone de Interface', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Ferramenta de API', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' }
    ];

    const meusLivros = [
        { imagem: 'assets/images/livro1.png', titulo: 'Entendendo Algoritmos', autor: '-Aditya Y. Bhargava', descricao: 'Um guia ilustrado e prático para entender os algoritmos mais essenciais.', descricaoDetalhada: 'O livro é um guia acessível e visual para entender conceitos fundamentais de algoritmos. Ele cobre tópicos como busca binária, ordenação, grafos e programação dinâmica de uma maneira fácil de digerir, usando exemplos e ilustrações em vez de equações complexas. É perfeito para iniciantes que querem construir uma base sólida.' },
        { imagem: 'assets/images/livro2.png', titulo: 'Python para análise de dados', autor: '-Wes McKinney', descricao: 'O guia definitivo para manipulação e análise de dados com Python.', descricaoDetalhada: 'Considerado um guia essencial para quem trabalha com dados em Python, este livro, escrito pelo criador da biblioteca pandas, ensina a usar as principais ferramentas do ecossistema de dados. Ele aborda bibliotecas como NumPy e pandas para limpar, transformar, processar e modelar dados, sendo uma referência técnica inestimável para cientistas de dados e analistas.' },
        { imagem: 'assets/images/storytelling.png', titulo: 'Storytelling com dados', autor: '-Cole Nussbaumer Knaflic', descricao: 'Aprenda a criar visualizações de dados que realmente contam uma história.', descricaoDetalhada: 'Cole Nussbaumer Knaflic ensina a arte de comunicar insights de dados de forma eficaz. O livro foca em princípios de design para visualizações e como construir narrativas persuasivas. Você vai aprender a escolher os gráficos certos e a focar no que realmente importa para a sua audiência, transformando dados brutos em uma história envolvente e clara.' },
        { imagem: 'assets/images/livro4.png', titulo: 'Data Science Do Zero', autor: '-Joel Grus', descricao: 'Um manual prático que ensina a construir ferramentas de Data Science do zero.', descricaoDetalhada: 'Este livro é uma jornada prática pelo universo da ciência de dados. Joel Grus, sem o uso de bibliotecas de alto nível, ensina a construir algoritmos e modelos estatísticos do zero. Você vai codificar em Python desde os conceitos básicos de matemática e probabilidade até a criação de um classificador de spam, ganhando uma compreensão profunda de como as ferramentas de Data Science realmente funcionam.' },
        { imagem: 'assets/images/livro5.png', titulo: 'Data Science para negócios', autor: '-Foster Provot & Tom Facett', descricao: 'Aprenda a pensar como um cientista de dados para resolver problemas de negócio.', descricaoDetalhada: 'O foco deste livro é na perspectiva de negócios da ciência de dados. Ele ensina os princípios fundamentais e como aplicar técnicas de Data Science para extrair valor e insights que impulsionam a tomada de decisões estratégicas. Em vez de focar na programação, o livro orienta sobre como formular problemas de negócio de forma que possam ser resolvidos com análise de dados.' }
    ];

    // =================================================================
    // FUNÇÃO PARA CRIAR CARDS
    // =================================================================
    function criarCard(item, index, tipo) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-image"><img src="${item.imagem}" alt="Imagem de ${item.titulo}"></div>
            <div class="card-content">
                <h3>${item.titulo}</h3>
                ${item.autor ? `<p><em>${item.autor}</em></p>` : ''}
                <p>${item.descricao}</p>
                <button class="btn btn-modal" data-tipo="${tipo}" data-index="${index}">Mais Informações</button>
            </div>
        `;
        return card;
    }

    // =================================================================
    // LÓGICA "VER MAIS" / "MOSTRAR MENOS"
    // =================================================================
    function inicializarCarregamentoDeConteudo(containerId, data, btnId, itemsIniciais, tipo) {
        const container = document.getElementById(containerId);
        const botao = document.getElementById(btnId);
        if (!container || !botao) return; // Proteção caso o elemento não exista
        let exibindoTodos = false;

        function renderizarItens() {
            container.innerHTML = '';
            const itensParaExibir = exibindoTodos ? data : data.slice(0, itemsIniciais);
            
            itensParaExibir.forEach((item, index) => {
                const itemIndexOriginal = data.findIndex(originalItem => originalItem.titulo === item.titulo && originalItem.descricao === item.descricao);
                container.appendChild(criarCard(item, itemIndexOriginal >= 0 ? itemIndexOriginal : index, tipo));
            });
            
            if (data.length <= itemsIniciais) {
                botao.style.display = 'none';
            } else {
                botao.style.display = 'inline-block';
                botao.textContent = exibindoTodos ? 'Mostrar Menos' : 'Ver Mais';
            }
        }

        botao.addEventListener('click', () => {
            exibindoTodos = !exibindoTodos;
            renderizarItens();
        });

        renderizarItens();
    }

    inicializarCarregamentoDeConteudo('projetos-container', meusProjetos, 'ver-mais-projetos', 3, 'projeto');
    inicializarCarregamentoDeConteudo('livros-container', meusLivros, 'ver-mais-livros', 3, 'livro');

    // =================================================================
    // LÓGICA DO MODAL
    // =================================================================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');

    function abrirModal(tipo, index) {
        const data = tipo === 'projeto' ? meusProjetos : meusLivros;
        const item = data[index];
        if (!item || !modalOverlay || !modalBody) return;

        modalBody.innerHTML = `
            <img src="${item.imagem}" alt="Imagem de ${item.titulo}">
            <h3>${item.titulo}</h3>
            ${item.autor ? `<p><strong>Autor:</strong> ${item.autor.replace('-', '')}</p>` : ''}
            <p>${item.descricaoDetalhada}</p>
            ${tipo === 'projeto' && item.linkExterno ? `<a href="${item.linkExterno}" target="_blank" class="btn">Ver Projeto Online</a>` : ''}
        `;
        modalOverlay.classList.add('modal-visible');
    }

    function fecharModal() {
        if (modalOverlay) modalOverlay.classList.remove('modal-visible');
    }

    document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-modal')) {
            const tipo = event.target.dataset.tipo;
            const index = parseInt(event.target.dataset.index, 10);
            abrirModal(tipo, index);
        }
    });

    if(modalCloseBtn) modalCloseBtn.addEventListener('click', fecharModal);
    if(modalOverlay) modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            fecharModal();
        }
    });

    // =================================================================
    // ANIMAÇÃO DE SCROLL (REVELAR SEÇÕES)
    // =================================================================
    const sections = document.querySelectorAll('.section-hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // =================================================================
    // LÓGICA DO MENU MOBILE
    // =================================================================
    class MobileNavbar {
        constructor(mobileMenu, navList, navLinks) {
            this.mobileMenu = document.querySelector(mobileMenu);
            this.navList = document.querySelector(navList);
            this.navLinks = document.querySelectorAll(navLinks);
            this.activeClass = "active";
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.navList.classList.toggle(this.activeClass);
            this.mobileMenu.classList.toggle(this.activeClass);
            document.body.classList.toggle('nav-open');
        }

        addClickEvent() {
            this.mobileMenu.addEventListener("click", this.handleClick);
            this.navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (this.navList.classList.contains(this.activeClass)) {
                        this.handleClick();
                    }
                });
            });
        }

        init() {
            if (this.mobileMenu) {
                this.addClickEvent();
            }
            return this;
        }
    }

    const mobileNavbar = new MobileNavbar( ".mobile-menu", ".nav-list", ".nav-list li a" );
    mobileNavbar.init();

    // =================================================================
    // LÓGICA DO MODO ESCURO (DARK MODE)
    // =================================================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Função para aplicar o tema e atualizar o botão
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.textContent = 'light';
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.textContent = 'dark';
        }
    };

    // Verifica o tema salvo no localStorage ao carregar a página
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Adiciona o evento de clique ao botão
    themeToggleBtn.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // =================================================================
    // LÓGICA DO BOTÃO FLUTUANTE DE REDES SOCIAIS (NOVO)
    // =================================================================
    const socialToggleBtn = document.getElementById('social-toggle-btn');
    const socialLinksWrapper = document.querySelector('.social-links-wrapper');

    if (socialToggleBtn && socialLinksWrapper) { // Garante que os elementos existem antes de adicionar o listener
        socialToggleBtn.addEventListener('click', () => {
            socialLinksWrapper.classList.toggle('visible');
            socialToggleBtn.classList.toggle('active'); // Essa linha é a que aplica/remove a classe 'active'
        });
    }
});
