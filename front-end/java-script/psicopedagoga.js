document.addEventListener('DOMContentLoaded', function () {
  const listaPsico = document.getElementById('lista-psico');

  const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];

  const psicopedagogos = profissionais.filter(p => 
    p.formacao && p.formacao.trim().toLowerCase() === 'psicopedagoga'
  );

  if (psicopedagogos.length === 0) {
    listaPsico.innerHTML = '<p>Nenhum psicopedagogo cadastrado no momento.</p>';
    return;
  }

  listaPsico.innerHTML = psicopedagogos.map(p => `
    <div class="card-psico">
      <img src="${p.fotoBase64 || ''}" alt="Foto de ${p.nome}" class="foto-profissional" />
      <h3>${p.nome}</h3>
      <p><strong>Especializações:</strong> ${p.especializacoes || '-'}</p>
      <p><strong>Email:</strong> <a href="mailto:${p.email || '#'}">${p.email || '-'}</a></p>
      <p><strong>Telefone:</strong> ${p.telefone || '-'}</p>
      <p><strong>Mini Bio:</strong> ${p.mini_bio || '-'}</p>
      <p><strong>Endereço:</strong> ${
        p.endereco
          ? `${p.endereco.logradouro}, ${p.endereco.numero} - ${p.endereco.bairro}, ${p.endereco.cidade} - ${p.endereco.uf}`
          : '-'
      }</p>
      <p><strong>Registro profissional:</strong> ${p.registro || '-'}</p>
      <p><strong>Tempo de experiência:</strong> ${p.experiencia || '-'} anos</p>
    </div>
  `).join('');
});
