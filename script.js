let usedProducts = {};

// Adiciona o produto ao display
function addToDisplay(productImg) {
    const slots = document.querySelectorAll('.product-slot');
    let added = false;

    // Verifica slots vazios antes de adicionar
    for (let slot of slots) {
        if (!slot.hasChildNodes()) {
            const img = document.createElement('img');
            img.src = `duracell/assets/${productImg}`;
            img.alt = 'Produto Duracell';
            img.onclick = function () { removeFromDisplay(this); };
            slot.appendChild(img);
            usedProducts[productImg] = (usedProducts[productImg] || 0) + 1;
            added = true;
            break;
        }
    }

    // Só mostra o modal se todos os slots estiverem realmente ocupados
    if (!added && checkAllSlotsFilled()) {
        showFullSlotsModal();
    }
}

// Verifica se todos os slots estão ocupados
function checkAllSlotsFilled() {
    const slots = document.querySelectorAll('.product-slot');
    return Array.from(slots).every(slot => slot.children.length > 0);
}

// Função para mostrar o modal com fade-in
function showFullSlotsModal() {
    const modal = document.getElementById('fullSlotsModal');
    modal.style.display = 'block';
    modal.style.opacity = '1';

    // Esmaecimento após 5 segundos
    setTimeout(() => {
        fadeOut(modal);
    }, 7000);

    // Fechar ao clicar na tela
    document.addEventListener('click', () => fadeOut(modal), { once: true });
}

// Função de esmaecimento (fade-out)
function fadeOut(element) {
    let opacity = 1;
    const fadeEffect = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(fadeEffect);
            element.style.display = 'none';
        } else {
            opacity -= 0.07;
            element.style.opacity = opacity;
        }
    }, 70);
}

// Remove o produto ao clicar nele
function removeFromDisplay(imgElement) {
    const productImg = imgElement.src.split('/').pop();
    usedProducts[productImg]--;
    if (usedProducts[productImg] === 0) delete usedProducts[productImg];
    imgElement.parentElement.removeChild(imgElement);
}

// Exibir o modal de sucesso
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

// Fechar o modal de sucesso
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Exibir o modal de erro
function showErrorModal() {
    document.getElementById('errorModal').style.display = 'flex';
}

// Função para limpar o display
function restartDisplay() {
    const slots = document.querySelectorAll('.product-slot img');

    // Remove todas as imagens dos slots
    slots.forEach(img => img.parentElement.removeChild(img));

    // Limpa o registro de produtos usados
    usedProducts = {};

    // Fecha o modal de erro
    document.getElementById('errorModal').style.display = 'none';
}

// Valida a montagem
function finalizarMontagem() {
    const displayArea = document.getElementById('displayArea');
    const repetidos = Object.values(usedProducts).filter(qtd => qtd > 1).length;
    const totalProdutos = Object.keys(usedProducts).length;

    if (totalProdutos === 5 && repetidos === 1) {
        displayArea.classList.remove('error');
        showSuccessModal();  // Mostra o modal de sucesso
    } else {
        displayArea.classList.add('error');
        showErrorModal();  // Mostra o modal de erro
    }
}

// Selecionando os elementos
const exitModal = document.getElementById('exitModal');
const closeBtn = document.querySelector('.close');
const continueBtn = document.getElementById('continueBtn');
const exitBtn = document.getElementById('exitBtn');

// Exibir o modal ao clicar no botão de fechar
closeBtn.addEventListener('click', () => {
    exitModal.style.display = 'flex';
});

// Fechar o modal e continuar no jogo
continueBtn.addEventListener('click', () => {
    exitModal.style.display = 'none';
});

// Redirecionar para a index.html ao clicar em "Sair"
exitBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Fechar o modal se clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === exitModal) {
        exitModal.style.display = 'none';
    }
});

// Seleciona o ícone e o modal
document.addEventListener('DOMContentLoaded', function () {
    const helpIcon = document.querySelector('.help');
    const helpModal = document.getElementById('helpModal');
    let timeoutId; // Controla o tempo do modal

    // Função para fechar o modal com efeito de esmaecimento
    function closeModal() {
        helpModal.style.opacity = '0'; // Inicia o esmaecimento

        // Espera o efeito terminar antes de esconder o modal
        setTimeout(() => {
            helpModal.classList.remove('active');
        }, 500); // Tempo igual ao do transition (0.5s)
    }

    // Função para abrir o modal
    function openModal() {
        helpModal.classList.add('active');
        helpModal.style.opacity = '1'; // Garante que apareça totalmente

        // Fecha automaticamente após 10 segundos
        timeoutId = setTimeout(closeModal, 10000);
    }

    // Clique no ícone de ajuda: abre ou fecha
    helpIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede o clique de fechar o modal imediatamente

        if (helpModal.classList.contains('active')) {
            // Se o modal já estiver aberto, fecha
            closeModal();
            clearTimeout(timeoutId); // Cancela o timer se fechar manualmente
        } else {
            // Se estiver fechado, abre
            openModal();
        }
    });

    // Clique fora do modal para fechar
    document.addEventListener('click', function (event) {
        if (helpModal.classList.contains('active') && !helpModal.contains(event.target) && !helpIcon.contains(event.target)) {
            closeModal();
            clearTimeout(timeoutId); // Cancela o timer se fechar manualmente
        }
    });
});
