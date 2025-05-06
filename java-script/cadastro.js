document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarUsuario();
    });
});

function cadastrarUsuario() {
    const nome = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    axios.post('http://localhost:8080/cadastro', {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
    })
    .then(response => {
        alert('Usuário cadastrado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário.');
    });
}
