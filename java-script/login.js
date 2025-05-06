document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        logarUsuario();
    });
});

function logarUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    axios.post('http://localhost:8080/login', {
        email: email,
        senha: senha
    })
    .then(response => {
        const resposta = response.data;
        if (resposta.success) {
            alert('Login realizado com sucesso!');
            window.location.href = './login-sucesso.html'; 
        } else {
            alert(resposta.message);
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login.');
    });
}
