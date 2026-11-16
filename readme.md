# Portfólio Web Dinâmico - Larissa Veridiano

Portfólio profissional desenvolvido do zero para o desafio do 4º bimestre, com HTML5, CSS3, JavaScript e Bootstrap 5, sem construtores de sites.
O site apresenta meu perfil, como as áreas do conhecimento contribuíram para minha lógica de programação, quatro tendências tecnológicas, a galeria dos meus projetos (Challenges do 1º ao 3º bimestre) e um formulário de contato com envio automático de e-mail. Também possui uma área administrativa oculta para gerenciar as mensagens.

## Tecnologias
- HTML5, CSS3 e JavaScript
- Bootstrap 5 (grid responsivo, navbar e cards)
- LocalStorage (mensagens guardadas no navegador, em formato JSON)
- Formspree (automação do envio de e-mail)

## Estrutura do projeto
```
Portfólio/
├── index.html   # seções e conteúdo
├── estilo.css   # cores e estilos
├── app.js       # formulário, LocalStorage e painel administrativo
├── README.md    # documentação
└── imagens do site (foto e prints dos challenges)
```

## Automação do formulário (Etapa 2.2)

Escolhi o **Formspree** para enviar as mensagens do formulário de contato para o meu e-mail.

**Por que escolhi:**
- **Não precisa de servidor.** Funciona só com JavaScript no navegador, o que combina com um site estático como este portfólio.
- **Segurança.** Não é preciso colocar senha de e-mail nem chave privada no código. Em um site público, isso ficaria visível para qualquer pessoa.
- **Gratuito.** O plano gratuito atende bem às necessidades do projeto.
- **Simples de integrar.** Basta um `fetch` com o método `POST` apontando para o endereço do formulário, sem instalar bibliotecas.

**Como funciona:**
1. O visitante preenche nome, e-mail e mensagem e clica em *Enviar*.
2. O `app.js` salva a mensagem no LocalStorage.
3. Em seguida, envia os mesmos dados em JSON ao Formspree com `fetch`.
4. O Formspree encaminha a mensagem para o meu e-mail, e o site mostra ao visitante uma mensagem de sucesso ou de erro.

## Como acessar a área administrativa oculta
A área não aparece no menu do site. Para acessá-la:

1. Abra o site (de preferência pelo Live Server do VS Code).
2. Adicione `#admin` no final do endereço. Exemplo: `http://127.0.0.1:5500/index.html#admin`
3. Aperte Enter. O painel com a tabela de mensagens será exibido. Se não aparecer, aperte F5.

### Como testar o CRUD
- **Criar:** preencha nome, e-mail e mensagem no formulário do painel e clique em *Salvar*. O registro aparece no fim da tabela.
- **Ler:** a tabela mostra todas as mensagens salvas no LocalStorage, incluindo as enviadas pelo formulário de contato.
- **Atualizar:** clique em *Editar* na linha desejada, altere os dados no formulário e clique em *Salvar*.
- **Excluir:** clique em *Excluir* na linha desejada e confirme.

### Dados de teste
No primeiro acesso, se o LocalStorage (chave `mensagensContato`) estiver vazio, o sistema injeta automaticamente **20 registros de teste** em formato JSON, para que o painel já abra com dados.

Para repetir esse teste: aperte F12, vá em **Application → Local Storage**, apague a chave `mensagensContato` e recarregue a página (F5).

## Como executar
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

## Autora
**Larissa Veridiano**, estudante do Ensino Médio Técnico em Tecnologia da Informação (Senac Nações Unidas).
GitHub: [https://github.com/larissaveridiano/Projetos-T.I]