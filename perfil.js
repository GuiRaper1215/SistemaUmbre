// Dados do usuário - substitua pelos dados reais
const user = {
  nome: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-8888",
  nascimento: "1985-12-15",
  foto: "https://randomuser.me/api/portraits/men/75.jpg"
};

// Função para formatar a data para dd/mm/aaaa
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Preenche os dados na página
document.getElementById("userPhoto").src = user.foto;
document.getElementById("userPhoto").alt = `Foto de ${user.nome}`;
document.getElementById("userName").textContent = user.nome;
document.getElementById("userEmail").textContent = user.email;
document.getElementById("userPhone").textContent = user.telefone;
document.getElementById("userBirthdate").textContent = formatDate(user.nascimento);
