document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroProfissionalForm');
  
  function arquivoParaBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

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
        especializacoes: form.especializacoes.value.trim(),
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
        experiencia: Number(form.experiencia.value),
        publicoAtipico: Number(form.publico_atipico.value),
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

      // Limpa arquivos selecionados
      form.foto.value = '';
      form.diploma.value = '';

      listarProfissionais();

    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar profissional. Tente novamente.');
    }
  });

  function listarProfissionais() {
    const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
    console.log('Profissionais cadastrados:');
    profissionais.forEach((p, i) => {
      console.log(`${i + 1}. Nome: ${p.nome} | Formação: ${p.formacao} | CPF: ${p.cpf}`);
    });
  }

  listarProfissionais();
});
