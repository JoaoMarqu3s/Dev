document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // DADOS (PROJETOS E LIVROS)
    // =================================================================
    const meusProjetos = [
        { imagem: 'assets/images/projeto1.jpg', titulo: 'Projeto 1: Site Institucional', descricao: 'Descrição curta. Destaque as tecnologias e o propósito.', descricaoDetalhada: 'Aqui você coloca uma descrição muito mais completa sobre o projeto 1. Fale sobre os desafios, o processo de desenvolvimento, as tecnologias usadas (React, Node.js, etc.) e o que você aprendeu.', linkExterno: '#' },
        { imagem: 'assets/images/projeto2.jpg', titulo: 'Projeto 2: App de Tarefas', descricao: 'Outro projeto focado em responsividade e UX.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 2. Explique a arquitetura, as decisões de design e como ele resolve um problema real.', linkExterno: '#' },
        { imagem: 'assets/images/projeto3.jpg', titulo: 'Projeto 3: Landing Page', descricao: 'Uma landing page moderna com animações e foco em conversão.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 3. Dê todos os detalhes que um recrutador gostaria de saber.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Projeto 4: Portfólio Antigo', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Projeto 5: Clone de Interface', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' },
        { imagem: 'assets/images/projeto4.jpg', titulo: 'Projeto 6: Ferramenta de API', descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.', descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.', linkExterno: '#' }
    ];

    const meusLivros = [
        { imagem: 'assets/images/livro1.png', titulo: 'Entendo algoritmos', autor: '-Aditya Y. Bhargava', descricao: 'Um livro fantástico para criar uma base sólida sobre algoritmos e lógica.', descricaoDetalhada: 'O livro ajudou...' },
        { imagem: 'assets/images/livro2.png', titulo: 'Python para análise de dados', autor: '-Wes McKinney', descricao: 'Aprenda a utilizar python para criar análises de dados importantes', descricaoDetalhada: 'Detalhes sobre "CSS Secrets". Comente sobre as técnicas avançadas que você aprendeu com o livro e como aplica esses conceitos nos seus projetos para criar interfaces mais robustas e criativas.' },
        { imagem: 'assets/images/livro3.jpg', titulo: 'Não Me Faça Pensar', autor: '-Steve Krug', descricao: 'Um clássico sobre usabilidade e experiência do usuário na web.', descricaoDetalhada: 'Uma análise do livro "Não Me Faça Pensar" de Steve Krug, e como os princípios de usabilidade que ele ensina são aplicados no seu trabalho diário.' },
        { imagem: 'assets/images/livro4.jpg', titulo: 'Código Limpo', autor: '-Robert C. Martin', descricao: 'Um guia essencial para escrever código de qualidade e fácil manutenção.', descricaoDetalhada: 'Detalhes sobre como os princípios do "Código Limpo" influenciaram minha forma de programar, resultando em software mais legível e escalável.' },
        { imagem: 'assets/images/livro5.jpg', titulo: 'Arquitetura Limpa', autor: '-Robert C. Martin', descricao: 'Guia do Artesão para Estrutura e Design de Software.', descricaoDetalhada: 'Uma análise de como os conceitos de "Arquitetura Limpa" me ajudam a projetar sistemas robustos, independentes de frameworks e testáveis.' },
        { imagem: 'assets/images/livro6.jpg', titulo: 'Padrões de Projeto', autor: '-Erich Gamma, et al.', descricao: 'Soluções reutilizáveis para problemas comuns em desenvolvimento.', descricaoDetalhada: 'Explicação de como o estudo de Padrões de Projeto (Design Patterns) melhorou minha capacidade de resolver problemas complexos de forma elegante e eficiente.' }
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
});