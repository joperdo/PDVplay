document.addEventListener("DOMContentLoaded", function () {
    // Captura o botão "Começar" da Duracell
    const duracellBtn = document.getElementById("duracellBtn");

    // Adiciona um evento de clique para redirecionar à página do tutorial
    duracellBtn.addEventListener("click", function () {
        window.location.href = "duracelltutorial.html";
    });
});
