const KEY = "mensagensContato";

function ler() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
function gravar(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}

if (ler().length === 0) {
  const teste = [];
  for (let i = 1; i <= 20; i++) {
    teste.push({
      id: i,
      nome: "Pessoa " + i,
      email: "pessoa" + i + "@teste.com",
      mensagem: "Mensagem de teste " + i,
      data: new Date().toISOString()
    });
  }
  gravar(teste);
}

document.getElementById("form-contato").addEventListener("submit", function (e) {
  e.preventDefault();   // impede a página de recarregar

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  const lista = ler();
  const novoId = lista.length ? Math.max(...lista.map(m => m.id)) + 1 : 1;
  lista.push({ id: novoId, nome, email, mensagem, data: new Date().toISOString() });
  gravar(lista);

  fetch("https://formspree.io/f/mwlovrva", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify({ nome, email, mensagem })
})
.then(resp => {
  const st = document.getElementById("status");
  if (resp.ok) {
    st.className = "alert alert-success";
    st.textContent = "Mensagem enviada! Obrigada pelo contato.";
    document.getElementById("form-contato").reset();
  } else {
    throw new Error();
  }
})
.catch(() => {
  const st = document.getElementById("status");
  st.className = "alert alert-warning";
  st.textContent = "Salvei sua mensagem aqui, mas o e-mail não foi enviado. Tente de novo.";
});
});

function verificarRota() {
  const admin = document.getElementById("admin");
  if (location.hash === "#admin") {
    admin.classList.remove("d-none");
    desenharTabela();
  } else {
    admin.classList.add("d-none");
  }
}
window.addEventListener("hashchange", verificarRota);
verificarRota();

function desenharTabela() {
  const corpo = document.getElementById("tabela");
  corpo.innerHTML = "";
  ler().forEach(m => {
    corpo.innerHTML += `
      <tr>
        <td>${m.id}</td><td>${m.nome}</td><td>${m.email}</td><td>${m.mensagem}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary" onclick="editar(${m.id})">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluir(${m.id})">Excluir</button>
        </td>
      </tr>`;
  });
}

function excluir(id) {
  if (!confirm("Excluir esta mensagem?")) return;
  gravar(ler().filter(m => m.id !== id));   // mantém todos, menos o excluído
  desenharTabela();
}


function editar(id) {
  const m = ler().find(x => x.id === id);
  document.getElementById("a-id").value = m.id;
  document.getElementById("a-nome").value = m.nome;
  document.getElementById("a-email").value = m.email;
  document.getElementById("a-msg").value = m.mensagem;
}

document.getElementById("form-admin").addEventListener("submit", function (e) {
  e.preventDefault();
  const lista = ler();
  const id = document.getElementById("a-id").value;
  const dados = {
    nome: document.getElementById("a-nome").value,
    email: document.getElementById("a-email").value,
    mensagem: document.getElementById("a-msg").value
  };

  if (id) {   // tem id: atualiza
    const item = lista.find(m => m.id == id);
    Object.assign(item, dados);
  } else {    // sem id: cria
    const novoId = lista.length ? Math.max(...lista.map(m => m.id)) + 1 : 1;
    lista.push({ id: novoId, ...dados, data: new Date().toISOString() });
  }
  gravar(lista);
  this.reset();
  document.getElementById("a-id").value = "";
  desenharTabela();
});

