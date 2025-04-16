document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-contato");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let mensagem = document.getElementById("mensagem").value.trim();

        let valid = true;

        if (nome === "") {
            alert("Por favor, preencha o campo Nome.");
            valid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "") {
            alert("Por favor, preencha o campo Email.");
            valid = false;
        } else if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido.");
            valid = false;
        }

        if (mensagem === "") {
            alert("Por favor, preencha o campo Mensagem.");
            valid = false;
        }

        if (valid) {
            form.submit();
        }
    });
});
