document.addEventListener("DOMContentLoaded", function () {
    // Captura o botão "Começar" da Duracell
    const duracellBtn = document.getElementById("duracellBtn");

    // Adiciona um evento de clique para redirecionar à página do tutorial
    duracellBtn.addEventListener("click", function () {
        window.location.href = "duracelltutorial.html";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInputs = document.querySelectorAll(".search input"); // Captura ambas as barras de pesquisa
    const cards = document.querySelectorAll(".section-industrias .card");

    function filterCards(searchTerm) {
        cards.forEach(card => {
            const img = card.querySelector("img");
            const id = img.id.toLowerCase();

            if (id.includes(searchTerm)) {
                card.style.display = "block"; // Mostra o card se corresponder à pesquisa
            } else {
                card.style.display = "none"; // Oculta o card se não corresponder
            }
        });
    }

    searchInputs.forEach(input => {
        input.addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            filterCards(searchTerm);
        });
    });
});
