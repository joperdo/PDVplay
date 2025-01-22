document.addEventListener("DOMContentLoaded", function () {
    const bodyElement = document.querySelector('body');
    
    // Verifica se o id do body é 'tela1' antes de executar as interações
    if (bodyElement && bodyElement.id === 'tela1') {
        let usedProducts = {};

        // Adiciona o produto ao display
        window.addToDisplay = function (productImg) {
            const slots = document.querySelectorAll('.product-slot');
            let added = false;

            for (let slot of slots) {
                if (!slot.hasChildNodes()) {
                    const img = document.createElement('img');
                    img.src = `duracell/assets/${productImg}`;
                    img.alt = 'Produto Duracell';
                    img.onclick = function (event) {
                        event.stopPropagation();
                        removeFromDisplay(this);
                    };
                    slot.appendChild(img);

                    usedProducts[productImg] = (usedProducts[productImg] || 0) + 1;
                    added = true;
                    break;
                }
            }

            // Só mostra o modal se todos os slots estiverem ocupados
            if (!added && checkAllSlotsFilled()) {
                showFullSlotsModal();
            }
        };

        // Verifica se todos os slots estão preenchidos
        function checkAllSlotsFilled() {
            const slots = document.querySelectorAll('.product-slot');
            return Array.from(slots).every(slot => slot.children.length > 0);
        }

        // Mostra o modal de slots cheios
        function showFullSlotsModal() {
            const modal = document.getElementById('fullSlotsModal');
            modal.style.display = 'block';
            modal.style.opacity = '1';

            setTimeout(() => {
                fadeOut(modal);
            }, 5000);

            document.addEventListener('click', () => fadeOut(modal), { once: true });
        }

        // Função para fade-out (esmaecimento)
        function fadeOut(element) {
            let opacity = 1;
            const fadeEffect = setInterval(() => {
                if (opacity <= 0) {
                    clearInterval(fadeEffect);
                    element.style.display = 'none';
                } else {
                    opacity -= 0.05;
                    element.style.opacity = opacity;
                }
            }, 70);
        }

        // Remove o produto ao clicar nele
        window.removeFromDisplay = function (imgElement) {
            const productImg = imgElement.src.split('/').pop();
            usedProducts[productImg]--;
            if (usedProducts[productImg] === 0) delete usedProducts[productImg];
            imgElement.parentElement.removeChild(imgElement);
        };

        // Exibir o modal de sucesso
        window.showSuccessModal = function () {
            document.getElementById('successModal').style.display = 'flex';
        };

        // Fechar o modal de sucesso
        window.closeModal = function () {
            document.getElementById('successModal').style.display = 'none';
        };

        // Próxima página
        window.nextPage = function () {
            window.location.href = "duracell2.html";
        };

        // Exibir o modal de erro
        window.showErrorModal = function () {
            document.getElementById('errorModal').style.display = 'flex';
        };

        // Função para limpar o display
        window.restartDisplay = function () {
            const slots = document.querySelectorAll('.product-slot img');
            slots.forEach(img => img.parentElement.removeChild(img));

            usedProducts = {};

            document.getElementById('errorModal').style.display = 'none';
        };

        // Valida a montagem
        window.finalizarMontagem = function () {
            const displayArea = document.getElementById('displayArea');
            const repetidos = Object.values(usedProducts).filter(qtd => qtd > 1).length;
            const totalProdutos = Object.keys(usedProducts).length;

            if (totalProdutos === 5 && repetidos === 1) {
                displayArea.classList.remove('error');
                showSuccessModal();
            } else {
                displayArea.classList.add('error');
                showErrorModal();
            }
        };
    }
});


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
        timeoutId = setTimeout(closeModal, 5000);
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


//Interações da tela 2
document.addEventListener('DOMContentLoaded', function() {
    var tela2 = document.getElementById('tela2');

    if (tela2) {
        var optionButtons = document.querySelectorAll('.options button');

        optionButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                optionButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        document.getElementById('btnPronto').addEventListener('click', function() {
            finalizarMontagem();
        });

        function finalizarMontagem() {
            var selectedButton = document.querySelector('.options button.selected');
            
            closeAllModals(); // Fecha qualquer modal aberto antes de abrir um novo

            if (!selectedButton) {
                showFullSlotsModal("fullSlotsModal");
                return;
            }

            if (selectedButton.innerText.trim().toLowerCase() === "precificar") {
                abrirModal('successModal');
            } else {
                abrirModal('errorModal');
            }
        }

        // Pede para selecionar uma opção
        function showFullSlotsModal() {
            const modal = document.getElementById('fullSlotsModal');
            modal.style.display = 'block';
            modal.style.opacity = '1';
    
            setTimeout(() => {
                fadeOut(modal);
            }, 5000);
    
            document.addEventListener('click', () => fadeOut(modal), { once: true });
        }
    
        // Função para fade-out (esmaecimento)
        function fadeOut(element) {
            let opacity = 1;
            const fadeEffect = setInterval(() => {
                if (opacity <= 0) {
                    clearInterval(fadeEffect);
                    element.style.display = 'none';
                } else {
                    opacity -= 0.05;
                    element.style.opacity = opacity;
                }
            }, 70);
        }

        function abrirModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
        }

        window.closeModal = function () {
            document.getElementById('successModal').style.display = 'none';
        };

        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }

        document.querySelectorAll('.modal .close').forEach(function(closeBtn) {
            closeBtn.addEventListener('click', closeAllModals);
        });

        function restartDisplay() {
            closeAllModals();
            optionButtons.forEach(btn => btn.classList.remove('selected'));
        }

        document.querySelector('#errorModal button').addEventListener('click', restartDisplay);
    }
});
