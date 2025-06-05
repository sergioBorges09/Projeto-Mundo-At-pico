document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroProfissionalForm');
  if (!form) {
    console.error('Formulário não encontrado');
    return;
  }

  function arquivoParaBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const fotoFile = form.foto.files[0];
      const diplomaFile = form.diploma.files[0];

      if (!fotoFile || !diplomaFile) {
        alert('Foto e diploma são obrigatórios!');
        return;
      }

      const fotoBase64 = await arquivoParaBase64(fotoFile);
      const diplomaBase64 = await arquivoParaBase64(diplomaFile);

      const profissional = {
        nome: form.nome.value.trim(),
        cpf: form.cpf.value.trim(),
        nascimento: form.nascimento.value,
        formacao: form.formacao.value, 
        especializacoes: form.especializacoes.value,
        registro: form.registro.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        endereco: {
          logradouro: form.logradouro.value.trim(),
          numero: form.numero.value.trim(),
          complemento: form.complemento.value.trim(),
          bairro: form.bairro.value.trim(),
          cidade: form.cidade.value.trim(),
          uf: form.uf.value
        },
        cep: form.cep.value.trim(),
        diplomaBase64: diplomaBase64,
        experiencia: form.experiencia.value,
        publicoAtipico: form.publico_atipico.value,
        tiposAtendimento: form.tipos_atendimento.value.trim(),
        fotoBase64: fotoBase64,
        mini_bio: form.mini_bio.value.trim(),  
        redesSociais: form.redes_sociais.value.trim()
      };

      const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
      profissionais.push(profissional);
      localStorage.setItem('profissionais', JSON.stringify(profissionais));

      alert('Profissional cadastrado com sucesso!');
      form.reset();
    } catch (error) {
      console.error('Erro ao cadastrar profissional:', error);
      alert('Erro ao cadastrar profissional. Tente novamente.');
    }
  });
});
