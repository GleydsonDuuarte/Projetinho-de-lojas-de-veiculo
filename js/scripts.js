// Configurações iniciais e funções de UI

function setupGalleryEvents() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!modal) return;

    // Fechar modal
    if (closeBtn) closeBtn.onclick = closeGallery;

    // Fechar ao clicar fora
    modal.onclick = (e) => {
        if (e.target === modal) closeGallery();
    };

    // Navegação (verifica existência)
    if (prevBtn) prevBtn.onclick = prevImage;
    if (nextBtn) nextBtn.onclick = nextImage;

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        const modalEl = document.getElementById('galleryModal');
        if (modalEl && modalEl.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Configuração do formulário Netlify
function setupForm() {
    const form = document.querySelector('form[name="contato"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Validação básica
            const nome = document.getElementById('nome') ? document.getElementById('nome').value : '';
            const telefone = document.getElementById('telefone') ? document.getElementById('telefone').value : '';

            if (!nome || !telefone) {
                e.preventDefault();
                alert('Por favor, preencha pelo menos o nome e telefone.');
                return;
            }

            console.log('Formulário sendo enviado para Netlify...');
        });
    }
}

// Função para inicializar o site
function init() {
    // Configurar eventos da galeria
    setupGalleryEvents();

    // Configurar formulário
    setupForm();

    // Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const navUl = document.querySelector('nav ul');
            if (navUl) navUl.classList.toggle('show');
        });
    }

    // Navegação suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                const navUl = document.querySelector('nav ul');
                if (navUl) navUl.classList.remove('show');
            }
        });
    });

    // Preencher automaticamente o campo de veículo quando clicar em "Tenho Interesse"
    document.addEventListener('click', function(e) {
        if (e.target.classList && e.target.classList.contains('btn') && e.target.hasAttribute('data-vehicle')) {
            const vehicleName = e.target.getAttribute('data-vehicle');
            const select = document.getElementById('veiculo');

            if (select) {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].textContent.includes(vehicleName)) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }

            // Rolar até o formulário
            const contatoEl = document.getElementById('contato');
            if (contatoEl) contatoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Atualizar ano atual e anos de tradição
    updateFooterInfo();
}

// Função para atualizar informações do rodapé
function updateFooterInfo() {
    // Atualiza o ano atual no rodapé
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Calcula anos de tradição
    const anoAtual = new Date().getFullYear();
    const anosTradicao = anoAtual - 1999;

    // Atualiza em todos os locais
    const ids = [
        "anos-tradicao-hero",
        "anos-tradicao-sobre",
        "anos-tradicao-contato",
        "anos-tradicao-footer",
        "anos-tradicao-footer-text"
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = anosTradicao;
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carrega a seção de modelos (função definida em sheets-loader.js)
    if (typeof loadModelsSection === 'function') {
        loadModelsSection();
    }

    // Inicializa interações gerais
    init();
});
